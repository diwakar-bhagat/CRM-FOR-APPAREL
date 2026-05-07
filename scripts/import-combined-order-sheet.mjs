import dotenv from "dotenv";
import { neon, neonConfig } from "@neondatabase/serverless";
import XLSX from "xlsx";

dotenv.config({ path: ".env.local" });
dotenv.config();

neonConfig.fetchConnectionCache = true;

const workbookPath = process.argv[2] ?? "/Users/diwakarkumarbhagat/Downloads/Combined Order Sheet-(C-32-58 & 59)...xlsx";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const headerAliases = {
  buyer: ["buyer"],
  orderNo: ["order no.", "order no", "order number"],
  styleName: ["style description", "style name"],
  merchant: ["sr. merchant/d.m.m/m.m", "merchant"],
  fob: ["f.o.b", "fob"],
  sam: ["sam"],
  totalQty: ["total qty.", "total qty"],
  qty: ["qty.", "qty", "total qty."],
  deliveryDate: ["ex-factory", "actual hod", "tod"],
  revisedDeliveryDate: ["rivised ex-factory", "rivised \nex-factory", "revised ex-factory", "rivised \n hod"],
  pcdPlan: ["pcd plan"],
  pfh: ["pfh", "file h/o date"],
  fabricSupplier: ["fabric supplier"],
  fabricStatus: ["fabric status", "fabric i/h date", "fabric remarks"],
  trimStatus: ["trims status", "trim status"],
  productionQty: ["production \n till date", "production till date"],
  finishingQty: ["finishing\n till date", "finishing till date"],
  remarks: ["remarks"],
};

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const cleaned = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (!parsed) return null;
    return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
  }
  const text = String(value).trim();
  if (!text || /^done$/i.test(text) || /^i\/h$/i.test(text) || /^inhouse$/i.test(text) || /^on time$/i.test(text)) return null;
  const firstDate = text.match(/\d{1,2}[-/ ][A-Za-z]{3,9}[-/ ]?\d{0,4}|\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/)?.[0];
  const parsed = new Date(firstDate ?? text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function detectHeader(rows) {
  for (let index = 0; index < Math.min(rows.length, 10); index++) {
    const normalized = rows[index].map(normalize);
    if (normalized.some((cell) => headerAliases.orderNo.includes(cell)) && normalized.some((cell) => headerAliases.qty.includes(cell))) {
      return index;
    }
  }
  return -1;
}

function columnMap(headerRow) {
  const normalized = headerRow.map(normalize);
  const map = {};
  for (const [key, aliases] of Object.entries(headerAliases)) {
    const index = normalized.findIndex((cell) => aliases.includes(cell));
    if (index >= 0) map[key] = index;
  }
  return map;
}

function value(row, map, key) {
  const index = map[key];
  return index === undefined ? null : row[index];
}

function inferBuyer(row, map, currentBuyer) {
  const direct = value(row, map, "buyer");
  if (direct && !value(row, map, "orderNo")) return String(direct).trim();
  if (direct && value(row, map, "orderNo")) return String(direct).trim();
  return currentBuyer;
}

function statusFromDates(deliveryDate) {
  if (!deliveryDate) return "PENDING";
  return deliveryDate < new Date() ? "overdue" : "pending";
}

async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS public.orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      ref_no TEXT UNIQUE NOT NULL,
      buyer TEXT,
      brand TEXT,
      style_id TEXT,
      style_name TEXT,
      order_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      delivery_date TIMESTAMPTZ,
      pfh_status TEXT NOT NULL DEFAULT 'PENDING',
      sop_status TEXT NOT NULL DEFAULT 'PENDING',
      ppm_status TEXT NOT NULL DEFAULT 'PENDING',
      approval_pending BOOLEAN NOT NULL DEFAULT false,
      vendor_last_active TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    ALTER TABLE public.orders
      ADD COLUMN IF NOT EXISTS fob_value NUMERIC(12,4),
      ADD COLUMN IF NOT EXISTS sam_value NUMERIC(12,4),
      ADD COLUMN IF NOT EXISTS revenue_value NUMERIC(14,2) NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS source_sheet TEXT,
      ADD COLUMN IF NOT EXISTS fabric_supplier TEXT,
      ADD COLUMN IF NOT EXISTS fabric_status TEXT,
      ADD COLUMN IF NOT EXISTS trim_status TEXT,
      ADD COLUMN IF NOT EXISTS production_qty NUMERIC(12,2),
      ADD COLUMN IF NOT EXISTS finishing_qty NUMERIC(12,2)
  `;
}

const workbook = XLSX.readFile(workbookPath, { cellDates: true });
const parsedRows = [];

for (const sheetName of workbook.SheetNames) {
  if (sheetName === "Master Sheet") continue;
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: null, raw: false });
  const headerIndex = detectHeader(rows);
  if (headerIndex < 0) continue;
  const map = columnMap(rows[headerIndex]);
  let currentBuyer = null;

  for (const row of rows.slice(headerIndex + 1)) {
    currentBuyer = inferBuyer(row, map, currentBuyer);
    const orderNo = value(row, map, "orderNo");
    const qty = parseNumber(value(row, map, "qty") ?? value(row, map, "totalQty"));
    if (!orderNo || !qty) continue;

    const refNo = String(orderNo).replace(/\s+/g, " ").trim();
    if (!refNo || /^order no/i.test(refNo)) continue;

    const fob = parseNumber(value(row, map, "fob"));
    const sam = parseNumber(value(row, map, "sam"));
    const deliveryDate = parseDate(value(row, map, "deliveryDate")) ?? parseDate(value(row, map, "revisedDeliveryDate"));
    const styleName = value(row, map, "styleName");
    const fabricSupplier = value(row, map, "fabricSupplier");
    const fabricStatus = value(row, map, "fabricStatus");
    const trimStatus = value(row, map, "trimStatus");
    const productionQty = parseNumber(value(row, map, "productionQty"));
    const finishingQty = parseNumber(value(row, map, "finishingQty"));
    const revenue = fob ? Number((fob * qty).toFixed(2)) : 0;

    parsedRows.push({
      refNo,
      buyer: currentBuyer,
      brand: currentBuyer,
      styleId: refNo,
      styleName: styleName ? String(styleName).trim() : null,
      qty,
      fob,
      sam,
      revenue,
      deliveryDate,
      sheetName,
      fabricSupplier: fabricSupplier ? String(fabricSupplier).trim() : null,
      fabricStatus: fabricStatus ? String(fabricStatus).trim() : null,
      trimStatus: trimStatus ? String(trimStatus).trim() : null,
      productionQty,
      finishingQty,
      approvalPending: statusFromDates(deliveryDate) === "overdue",
    });
  }
}

await ensureSchema();

let imported = 0;
let revenue = 0;
for (const row of parsedRows) {
  await sql`
    INSERT INTO public.orders (
      ref_no, buyer, brand, style_id, style_name, order_qty, fob_value, sam_value, revenue_value,
      delivery_date, source_sheet, fabric_supplier, fabric_status, trim_status, production_qty, finishing_qty,
      approval_pending, updated_at
    ) VALUES (
      ${row.refNo}, ${row.buyer}, ${row.brand}, ${row.styleId}, ${row.styleName}, ${row.qty}, ${row.fob}, ${row.sam}, ${row.revenue},
      ${row.deliveryDate}, ${row.sheetName}, ${row.fabricSupplier}, ${row.fabricStatus}, ${row.trimStatus}, ${row.productionQty}, ${row.finishingQty},
      ${row.approvalPending}, NOW()
    )
    ON CONFLICT (ref_no) DO UPDATE SET
      buyer = COALESCE(EXCLUDED.buyer, public.orders.buyer),
      brand = COALESCE(EXCLUDED.brand, public.orders.brand),
      style_id = COALESCE(EXCLUDED.style_id, public.orders.style_id),
      style_name = COALESCE(EXCLUDED.style_name, public.orders.style_name),
      order_qty = EXCLUDED.order_qty,
      fob_value = COALESCE(EXCLUDED.fob_value, public.orders.fob_value),
      sam_value = COALESCE(EXCLUDED.sam_value, public.orders.sam_value),
      revenue_value = EXCLUDED.revenue_value,
      delivery_date = COALESCE(EXCLUDED.delivery_date, public.orders.delivery_date),
      source_sheet = EXCLUDED.source_sheet,
      fabric_supplier = COALESCE(EXCLUDED.fabric_supplier, public.orders.fabric_supplier),
      fabric_status = COALESCE(EXCLUDED.fabric_status, public.orders.fabric_status),
      trim_status = COALESCE(EXCLUDED.trim_status, public.orders.trim_status),
      production_qty = COALESCE(EXCLUDED.production_qty, public.orders.production_qty),
      finishing_qty = COALESCE(EXCLUDED.finishing_qty, public.orders.finishing_qty),
      approval_pending = EXCLUDED.approval_pending,
      updated_at = NOW()
  `;
  imported++;
  revenue += row.revenue;
}

console.log(JSON.stringify({ workbookPath, sheets: workbook.SheetNames.length, parsed: parsedRows.length, imported, revenue }, null, 2));
