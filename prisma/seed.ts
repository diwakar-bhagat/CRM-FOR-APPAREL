import * as XLSX from "xlsx";

import { PrismaClient } from "../generated/prisma";
import path from "node:path";

const prisma = new PrismaClient();

const BUYERS = new Set(["H&M", "ZARA", "Pull & Bear", "Street One", "Bestseller", "ECI", "AEO", "George"]);
const DEFAULT_UNIT = "D-235";

function normalizeHeader(input: unknown): string {
  return String(input ?? "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (!parsed) return undefined;
    return new Date(parsed.y, parsed.m - 1, parsed.d);
  }
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function parseFloatOrUndefined(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function parseIntOrUndefined(value: unknown): number | undefined {
  const num = parseFloatOrUndefined(value);
  return num === undefined ? undefined : Math.trunc(num);
}

function safeString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const text = String(value).trim();
  return text.length ? text : undefined;
}

async function upsertBuyer(name: string) {
  return prisma.buyer.upsert({
    where: { name },
    create: { name },
    update: {},
    select: { id: true, name: true },
  });
}

async function upsertUnit(name: string) {
  return prisma.unit.upsert({
    where: { name },
    create: { name },
    update: {},
    select: { id: true, name: true },
  });
}

async function seedMonthlyOrderSheet(workbook: XLSX.WorkBook, sheetName: string) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return;
  const rows = XLSX.utils.sheet_to_json<Array<unknown>>(sheet, { header: 1, raw: true });
  if (rows.length < 2) return;

  const headerRow = rows[1] ?? rows[0] ?? [];
  const headers = headerRow.map(normalizeHeader);
  let currentBuyer = "";

  for (let index = 2; index < rows.length; index += 1) {
    const row = rows[index] ?? [];
    const rawOrderNo = safeString(row[headers.indexOf("Order No.")]);
    const rowLabel = safeString(row[0]);
    if (rowLabel && BUYERS.has(rowLabel) && !rawOrderNo) {
      currentBuyer = rowLabel;
      continue;
    }
    if (!rawOrderNo) continue;
    if (rawOrderNo.toLowerCase().includes("total")) continue;

    const buyer = await upsertBuyer(currentBuyer || "Unknown");
    const plannedUnit = safeString(row[headers.indexOf("Planned Unit")]) ?? DEFAULT_UNIT;
    const unit = await upsertUnit(plannedUnit);

    await prisma.order.upsert({
      where: { orderNo: rawOrderNo },
      create: {
        orderNo: rawOrderNo,
        styleDescription: safeString(row[headers.indexOf("Style Description")]) ?? rawOrderNo,
        specialWork: safeString(row[headers.indexOf("Special Work")]),
        sam:
          parseFloatOrUndefined(row[headers.indexOf("SAM")]) ??
          parseFloatOrUndefined(row[headers.indexOf("Unnamed: 4")]),
        totalQty: parseIntOrUndefined(row[headers.indexOf("Total Qty.")]),
        qty: parseIntOrUndefined(row[headers.indexOf("Qty.")]) ?? 0,
        buyerId: buyer.id,
        unitId: unit.id,
        fabricSupplier: safeString(row[headers.indexOf("Fabric Supplier")]),
        fabricInhDate: parseDate(row[headers.indexOf("Fabric I/H Date")]),
        exFactoryDate:
          parseDate(row[headers.indexOf("Ex-Factory")]) ?? parseDate(row[headers.indexOf("Ex-Factory Start Date")]),
        revisedExFactory: parseDate(row[headers.indexOf("Rivised Ex-Factory")]),
        pcdPlan: parseDate(row[headers.indexOf("PCD Plan")]) ?? parseDate(row[headers.indexOf("PCD Plan Date")]),
        fileHoDate: parseDate(row[headers.indexOf("File H/O Date")]),
        rdDate: parseDate(row[headers.indexOf("R&D Date")]),
        ppComments: safeString(row[headers.indexOf("PP/CS Comments")]),
        remarks: safeString(row[headers.indexOf("Remarks")]),
        planStatus: safeString(row[headers.indexOf("Plan Status")]),
        fob: parseFloatOrUndefined(row[headers.indexOf("FOB")]),
        totalCost: parseFloatOrUndefined(row[headers.indexOf("Total Cost")]),
        producedSam: parseFloatOrUndefined(row[headers.indexOf("Produced SAM")]),
        month: sheetName,
      },
      update: {
        styleDescription: safeString(row[headers.indexOf("Style Description")]) ?? rawOrderNo,
        specialWork: safeString(row[headers.indexOf("Special Work")]),
        sam:
          parseFloatOrUndefined(row[headers.indexOf("SAM")]) ??
          parseFloatOrUndefined(row[headers.indexOf("Unnamed: 4")]),
        totalQty: parseIntOrUndefined(row[headers.indexOf("Total Qty.")]),
        qty: parseIntOrUndefined(row[headers.indexOf("Qty.")]) ?? 0,
        buyerId: buyer.id,
        unitId: unit.id,
        fabricSupplier: safeString(row[headers.indexOf("Fabric Supplier")]),
        fabricInhDate: parseDate(row[headers.indexOf("Fabric I/H Date")]),
        exFactoryDate:
          parseDate(row[headers.indexOf("Ex-Factory")]) ?? parseDate(row[headers.indexOf("Ex-Factory Start Date")]),
        revisedExFactory: parseDate(row[headers.indexOf("Rivised Ex-Factory")]),
        pcdPlan: parseDate(row[headers.indexOf("PCD Plan")]) ?? parseDate(row[headers.indexOf("PCD Plan Date")]),
        fileHoDate: parseDate(row[headers.indexOf("File H/O Date")]),
        rdDate: parseDate(row[headers.indexOf("R&D Date")]),
        ppComments: safeString(row[headers.indexOf("PP/CS Comments")]),
        remarks: safeString(row[headers.indexOf("Remarks")]),
        planStatus: safeString(row[headers.indexOf("Plan Status")]),
        fob: parseFloatOrUndefined(row[headers.indexOf("FOB")]),
        totalCost: parseFloatOrUndefined(row[headers.indexOf("Total Cost")]),
        producedSam: parseFloatOrUndefined(row[headers.indexOf("Produced SAM")]),
        month: sheetName,
      },
    });
  }
}

async function seedDrSheet(workbook: XLSX.WorkBook, sheetName: string) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return;
  const rows = XLSX.utils.sheet_to_json<Array<unknown>>(sheet, { header: 1, raw: true });
  if (rows.length < 2) return;
  const headers = (rows[1] ?? []).map(normalizeHeader);

  for (let index = 2; index < rows.length; index += 1) {
    const row = rows[index] ?? [];
    const srNo = parseIntOrUndefined(row[headers.indexOf("Sr. No.")]);
    const orderNo = safeString(row[headers.indexOf("Order No.")]);
    const buyerName = safeString(row[headers.indexOf("Buyer")]) ?? "Unknown";
    if (!srNo || !orderNo) continue;

    const buyer = await upsertBuyer(buyerName);
    const unitName = safeString(row[headers.indexOf("UNIT")]) ?? DEFAULT_UNIT;
    const unit = await upsertUnit(unitName);

    await prisma.dREntry.upsert({
      where: { sheetSource_srNo_orderNo: { sheetSource: sheetName, srNo, orderNo } },
      create: {
        srNo,
        buyerId: buyer.id,
        orderNo,
        styleDescription: safeString(row[headers.indexOf("Style Description")]) ?? orderNo,
        specialWork: safeString(row[headers.indexOf("Special Work")]),
        qty: parseIntOrUndefined(row[headers.indexOf("Qty.")]) ?? 0,
        tod: parseDate(row[headers.indexOf("TOD")]) ?? new Date(),
        wkNumber: parseIntOrUndefined(row[headers.indexOf("WK NUMBER")]),
        onMachine: safeString(row[headers.indexOf("ON M/C")]),
        offMachine: safeString(row[headers.indexOf("OFF M/C")]),
        remarks: safeString(row[headers.indexOf("Remarks")]),
        unitId: unit.id,
        sheetSource: sheetName,
      },
      update: {
        buyerId: buyer.id,
        styleDescription: safeString(row[headers.indexOf("Style Description")]) ?? orderNo,
        specialWork: safeString(row[headers.indexOf("Special Work")]),
        qty: parseIntOrUndefined(row[headers.indexOf("Qty.")]) ?? 0,
        tod: parseDate(row[headers.indexOf("TOD")]) ?? new Date(),
        wkNumber: parseIntOrUndefined(row[headers.indexOf("WK NUMBER")]),
        onMachine: safeString(row[headers.indexOf("ON M/C")]),
        offMachine: safeString(row[headers.indexOf("OFF M/C")]),
        remarks: safeString(row[headers.indexOf("Remarks")]),
        unitId: unit.id,
        sheetSource: sheetName,
      },
    });
  }
}

async function seedMasterSheet(workbook: XLSX.WorkBook, sheetName: string) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return;
  const rows = XLSX.utils.sheet_to_json<Array<unknown>>(sheet, { header: 1, raw: true });
  if (rows.length < 3) return;

  const monthHeaders = (rows[0] ?? []).map(normalizeHeader);
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex] ?? [];
    const buyerName = safeString(row[0]);
    if (!buyerName || buyerName.toLowerCase().includes("total")) continue;

    for (let column = 1; column < monthHeaders.length; column += 3) {
      const monthLabel = monthHeaders[column];
      if (!monthLabel) continue;
      const monthDate = parseDate(`01-${monthLabel}`);
      if (!monthDate) continue;
      await prisma.monthlySummary.upsert({
        where: { month_buyerName: { month: monthDate, buyerName } },
        create: {
          month: monthDate,
          buyerName,
          planToShip: parseIntOrUndefined(row[column]),
          stitchedQty: parseIntOrUndefined(row[column + 1]),
          balToSew: parseIntOrUndefined(row[column + 2]),
        },
        update: {
          planToShip: parseIntOrUndefined(row[column]),
          stitchedQty: parseIntOrUndefined(row[column + 1]),
          balToSew: parseIntOrUndefined(row[column + 2]),
        },
      });
    }
  }
}

async function seedDefaultData() {
  console.log("📝 Seeding default test data...");

  // Seed buyers
  const buyers = await Promise.all(
    ["H&M", "ZARA", "Pull & Bear", "Street One", "Bestseller", "ECI", "AEO", "George"].map((name) => upsertBuyer(name)),
  );

  // Seed units
  const units = await Promise.all(["D-235", "C-32", "A-12", "PLK"].map((name) => upsertUnit(name)));

  // Seed sample orders
  for (let i = 0; i < 5; i++) {
    const buyer = buyers[i % buyers.length];
    const unit = units[i % units.length];

    const orderDate = new Date();
    orderDate.setMonth(orderDate.getMonth() - (i % 3));

    await prisma.order.upsert({
      where: { orderNo: `ORDER-${Date.now()}-${i}` },
      create: {
        orderNo: `ORDER-${Date.now()}-${i}`,
        styleDescription: `Sample Style ${i + 1}`,
        specialWork: i % 2 === 0 ? "Emb." : undefined,
        sam: 15 + i * 2,
        totalQty: 1000 + i * 100,
        qty: 1000 + i * 100,
        buyerId: buyer.id,
        unitId: unit.id,
        fabricSupplier: "Default Supplier",
        exFactoryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        pcdPlan: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        planStatus: "Planned",
        month: `${["Jan", "Feb", "Mar", "Apr", "May"][i % 5]}-26`,
      },
      update: {},
    });
  }

  console.log("✓ Default data seeded");
}

async function main() {
  try {
    console.log("🌱 Starting database seed...");

    const workbookPath = path.join(process.cwd(), "Combined_Order_Sheet_D-235.xlsx");
    const fs = await import("fs");

    if (fs.existsSync(workbookPath)) {
      console.log("📂 Excel file found, importing data...");
      const workbook = XLSX.readFile(workbookPath);

      const sheetNames = workbook.SheetNames;
      const monthlySheets = sheetNames.filter((name) => /[A-Za-z]{3}-\d{2}/.test(name));
      for (const sheetName of monthlySheets) {
        await seedMonthlyOrderSheet(workbook, sheetName);
      }

      const drSheets = sheetNames.filter((name) => name.toUpperCase().includes("DR"));
      for (const sheetName of drSheets) {
        await seedDrSheet(workbook, sheetName);
      }

      if (sheetNames.includes("Master Sheet")) {
        await seedMasterSheet(workbook, "Master Sheet");
      }
    } else {
      console.log("⚠️  Excel file not found, seeding with default data...");
      await seedDefaultData();
    }

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Seed error:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
