import { sql } from "@/lib/db";

export async function ensureOrdersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS public.orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      ref_no TEXT UNIQUE NOT NULL,
      buyer TEXT,
      brand TEXT,
      style_id TEXT,
      style_name TEXT,
      order_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      fob_value NUMERIC(12,4),
      sam_value NUMERIC(12,4),
      revenue_value NUMERIC(14,2) NOT NULL DEFAULT 0,
      delivery_date TIMESTAMPTZ,
      source_sheet TEXT,
      fabric_supplier TEXT,
      fabric_status TEXT,
      trim_status TEXT,
      production_qty NUMERIC(12,2),
      finishing_qty NUMERIC(12,2),
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
      ADD COLUMN IF NOT EXISTS buyer TEXT,
      ADD COLUMN IF NOT EXISTS brand TEXT,
      ADD COLUMN IF NOT EXISTS style_id TEXT,
      ADD COLUMN IF NOT EXISTS style_name TEXT,
      ADD COLUMN IF NOT EXISTS order_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS fob_value NUMERIC(12,4),
      ADD COLUMN IF NOT EXISTS sam_value NUMERIC(12,4),
      ADD COLUMN IF NOT EXISTS revenue_value NUMERIC(14,2) NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS delivery_date TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS source_sheet TEXT,
      ADD COLUMN IF NOT EXISTS fabric_supplier TEXT,
      ADD COLUMN IF NOT EXISTS fabric_status TEXT,
      ADD COLUMN IF NOT EXISTS trim_status TEXT,
      ADD COLUMN IF NOT EXISTS production_qty NUMERIC(12,2),
      ADD COLUMN IF NOT EXISTS finishing_qty NUMERIC(12,2),
      ADD COLUMN IF NOT EXISTS pfh_status TEXT NOT NULL DEFAULT 'PENDING',
      ADD COLUMN IF NOT EXISTS sop_status TEXT NOT NULL DEFAULT 'PENDING',
      ADD COLUMN IF NOT EXISTS ppm_status TEXT NOT NULL DEFAULT 'PENDING',
      ADD COLUMN IF NOT EXISTS approval_pending BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN IF NOT EXISTS vendor_last_active TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_orders_source_sheet ON public.orders(source_sheet)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_revenue_value ON public.orders(revenue_value)`;
}

export async function ensureOrderProcessTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.order_processes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
      vg_linked BOOLEAN NOT NULL DEFAULT false,
      ra_approved BOOLEAN NOT NULL DEFAULT false,
      fabric_pending INTEGER NOT NULL DEFAULT 0,
      fabric_pr INTEGER NOT NULL DEFAULT 0,
      fabric_po INTEGER NOT NULL DEFAULT 0,
      fabric_stock INTEGER NOT NULL DEFAULT 0,
      fabric_total INTEGER NOT NULL DEFAULT 0,
      trim_pending INTEGER NOT NULL DEFAULT 0,
      trim_pr INTEGER NOT NULL DEFAULT 0,
      trim_po INTEGER NOT NULL DEFAULT 0,
      trim_stock INTEGER NOT NULL DEFAULT 0,
      trim_total INTEGER NOT NULL DEFAULT 0,
      bulk_process INTEGER,
      fob INTEGER,
      bulk_emb INTEGER,
      rd_graded_pattern BOOLEAN NOT NULL DEFAULT false,
      pfh INTEGER,
      rd INTEGER,
      sop INTEGER,
      ppm INTEGER,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureInventoryTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS public.inventory_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      item_type TEXT NOT NULL,
      category TEXT NOT NULL,
      sub_category TEXT NOT NULL,
      item_name TEXT NOT NULL,
      width TEXT,
      storage_method TEXT,
      supplier TEXT,
      stock_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      reserved_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      unit TEXT NOT NULL DEFAULT 'MTR',
      reorder_level NUMERIC(12,2) NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'HEALTHY',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(item_type, category, sub_category, item_name, width)
    )
  `;

  const existing = await sql`SELECT COUNT(*)::int AS count FROM public.inventory_items`;
  if (Number(existing[0]?.count ?? 0) > 0) return;

  await sql`
    INSERT INTO public.inventory_items (
      item_type, category, sub_category, item_name, width, storage_method, supplier, stock_qty, reserved_qty, unit, reorder_level, status
    ) VALUES
      ('TRIM', 'Ribbon & Tape', 'Satin', 'Satin ribbon roll', '1/4"', 'Wrapped on cardboard cards in labeled bins', 'CTA Store', 420, 95, 'MTR', 120, 'HEALTHY'),
      ('TRIM', 'Ribbon & Tape', 'Grosgrain', 'Grosgrain tape', '1/2"', 'Spool storage by width', 'CTA Store', 180, 72, 'MTR', 100, 'WATCH'),
      ('TRIM', 'Ribbon & Tape', 'Velvet', 'Velvet tape', '1/2"', 'Rolled on comic boards', 'Local Supplier', 90, 45, 'MTR', 80, 'WATCH'),
      ('TRIM', 'Lace & Edging', 'Chantilly lace', 'Chantilly lace edging', '2"', 'Flat wrapped with tissue separators', 'Lace House', 65, 38, 'MTR', 75, 'LOW'),
      ('TRIM', 'Lace & Edging', 'Scalloped edges', 'Scalloped lace trim', '1"', 'Hanging sample cards plus bin stock', 'Lace House', 210, 70, 'MTR', 90, 'HEALTHY'),
      ('TRIM', 'Lace & Edging', 'Beaded lace', 'Beaded lace trim', '1.5"', 'Padded roll storage', 'Premium Trims', 44, 22, 'MTR', 60, 'LOW'),
      ('TRIM', 'Fringe & Tassels', 'Chainette fringe', 'Chainette fringe roll', '3"', 'Spool storage to prevent tangling', 'Trim Craft', 155, 40, 'MTR', 70, 'HEALTHY'),
      ('TRIM', 'Fringe & Tassels', 'Loop trimming', 'Loop trimming tape', '1"', 'Clear bins by usage', 'Trim Craft', 120, 35, 'MTR', 60, 'HEALTHY'),
      ('TRIM', 'Functional Trims', 'Elastic', 'Knitted elastic', '3/8"', 'Spools stacked by width', 'Functional Supply', 520, 180, 'MTR', 200, 'HEALTHY'),
      ('TRIM', 'Functional Trims', 'Zippers', 'Nylon zipper', '8"', 'Drawer bins by size and color', 'Functional Supply', 730, 210, 'PCS', 250, 'HEALTHY'),
      ('TRIM', 'Functional Trims', 'Buttons', 'Shell buttons', '18L', 'Small part drawers by line', 'Button House', 2200, 640, 'PCS', 800, 'HEALTHY'),
      ('FABRIC', 'Core Fabric', 'Cotton', 'Cotton poplin', '44"', 'Roll rack by buyer and width', 'CTA', 2600, 1100, 'MTR', 900, 'HEALTHY'),
      ('FABRIC', 'Core Fabric', 'Linen', 'Linen blend', '52"', 'Roll rack with shade tags', 'CTA', 740, 510, 'MTR', 650, 'WATCH'),
      ('FABRIC', 'Surface Fabric', 'Jacquard', 'Jacquard fabric', '48"', 'Roll rack by design code', 'Premium Mill', 380, 310, 'MTR', 400, 'LOW')
    ON CONFLICT (item_type, category, sub_category, item_name, width) DO NOTHING
  `;
}

export async function ensureSampleTrackingTables() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.sample_requests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      our_ref TEXT UNIQUE NOT NULL,
      order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      merchant TEXT,
      prepared_by TEXT,
      dept_from TEXT NOT NULL,
      item_type TEXT NOT NULL DEFAULT 'FABRIC',
      buyer TEXT,
      season TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS public.sample_stages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sample_request_id UUID NOT NULL REFERENCES public.sample_requests(id) ON DELETE CASCADE,
      stage TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'PENDING',
      started_at TIMESTAMPTZ,
      completed_at TIMESTAMPTZ,
      assigned_to TEXT,
      remarks TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(sample_request_id, stage)
    )
  `;
}

export async function ensureDesignVaultTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.design_vault_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      design_id INTEGER GENERATED BY DEFAULT AS IDENTITY UNIQUE,
      style_no TEXT NOT NULL,
      style_name TEXT,
      buyer TEXT NOT NULL,
      brand TEXT NOT NULL,
      designer TEXT NOT NULL,
      season TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'DESIGNING',
      image_url TEXT,
      additional_images TEXT[] NOT NULL DEFAULT '{}',
      order_id UUID,
      created_by TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureDrEntriesTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.dr_entries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sr_no INTEGER NOT NULL DEFAULT 0,
      buyer TEXT,
      order_no TEXT NOT NULL,
      style_description TEXT,
      special_work TEXT,
      qty INTEGER NOT NULL DEFAULT 0,
      tod TIMESTAMPTZ,
      wk_number INTEGER,
      on_machine TEXT,
      off_machine TEXT,
      remarks TEXT,
      unit TEXT NOT NULL DEFAULT 'CTA',
      sheet_source TEXT,
      order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const existing = await sql`SELECT COUNT(*)::int AS count FROM public.dr_entries`;
  if (Number(existing[0]?.count ?? 0) > 0) return;

  await sql`
    INSERT INTO public.dr_entries (
      sr_no,
      buyer,
      order_no,
      style_description,
      qty,
      tod,
      wk_number,
      unit,
      sheet_source,
      order_id
    )
    SELECT
      ROW_NUMBER() OVER (ORDER BY delivery_date ASC NULLS LAST, ref_no ASC)::int,
      buyer,
      ref_no,
      style_name,
      COALESCE(order_qty, 0)::int,
      delivery_date,
      EXTRACT(WEEK FROM delivery_date)::int,
      'CTA',
      'orders',
      id
    FROM public.orders
  `;
}

export async function ensureNotificationsTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      reff_no TEXT,
      style_name TEXT,
      message TEXT NOT NULL,
      created_by TEXT,
      is_read BOOLEAN NOT NULL DEFAULT false,
      type TEXT NOT NULL DEFAULT 'INFO',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const existing = await sql`SELECT COUNT(*)::int AS count FROM public.notifications`;
  if (Number(existing[0]?.count ?? 0) > 0) return;

  await sql`
    INSERT INTO public.notifications (reff_no, style_name, message, created_by, type)
    SELECT
      ref_no,
      style_name,
      CONCAT('Order ', ref_no, ' needs dashboard review'),
      'System',
      CASE
        WHEN approval_pending THEN 'ACTION'
        WHEN delivery_date < NOW() THEN 'RISK'
        ELSE 'INFO'
      END
    FROM public.orders
    WHERE approval_pending = true OR delivery_date <= NOW() + INTERVAL '14 days'
    ORDER BY delivery_date ASC NULLS LAST
    LIMIT 25
  `;
}

export async function ensureMaterialRequisitionTables() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.material_requisitions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      requisition_no TEXT UNIQUE,
      requisition_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      item_type TEXT NOT NULL DEFAULT 'FABRIC',
      company TEXT NOT NULL DEFAULT 'CTA APPARELS PVT. LTD.',
      reqn_type TEXT NOT NULL DEFAULT 'LOCAL',
      requisition_for TEXT NOT NULL DEFAULT 'Sample',
      buyer TEXT,
      season TEXT,
      for_location TEXT,
      prepared_by TEXT,
      dept_from TEXT,
      dept_to TEXT,
      order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    ALTER TABLE public.material_requisitions
      ADD COLUMN IF NOT EXISTS requisition_no TEXT,
      ADD COLUMN IF NOT EXISTS requisition_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS item_type TEXT NOT NULL DEFAULT 'FABRIC',
      ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT 'CTA APPARELS PVT. LTD.',
      ADD COLUMN IF NOT EXISTS reqn_type TEXT NOT NULL DEFAULT 'LOCAL',
      ADD COLUMN IF NOT EXISTS requisition_for TEXT NOT NULL DEFAULT 'Sample',
      ADD COLUMN IF NOT EXISTS buyer TEXT,
      ADD COLUMN IF NOT EXISTS season TEXT,
      ADD COLUMN IF NOT EXISTS for_location TEXT,
      ADD COLUMN IF NOT EXISTS prepared_by TEXT,
      ADD COLUMN IF NOT EXISTS dept_from TEXT,
      ADD COLUMN IF NOT EXISTS dept_to TEXT,
      ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'DRAFT',
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS public.material_requisition_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      requisition_id UUID NOT NULL REFERENCES public.material_requisitions(id) ON DELETE CASCADE,
      item_category TEXT NOT NULL,
      item_desc TEXT NOT NULL,
      color TEXT,
      width TEXT,
      unit TEXT,
      reqn_qty NUMERIC,
      rate NUMERIC,
      req_on TIMESTAMPTZ,
      remark TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureFabricReportsTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.fabric_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      our_ref TEXT UNIQUE NOT NULL,
      order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      order_no TEXT NOT NULL,
      po_no TEXT,
      user_created TEXT,
      order_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      qty_unit TEXT NOT NULL DEFAULT 'PCS',
      style_no TEXT,
      order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'DRAFT',
      pdf_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureDispatchChallanTables() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.dispatch_challans (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      challan_no TEXT UNIQUE NOT NULL,
      order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
      dispatch_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      from_location TEXT NOT NULL,
      to_location TEXT NOT NULL,
      prepared_by TEXT,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS public.dispatch_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      challan_id UUID NOT NULL REFERENCES public.dispatch_challans(id) ON DELETE CASCADE,
      description TEXT NOT NULL,
      qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      unit TEXT NOT NULL DEFAULT 'PCS',
      remark TEXT
    )
  `;
}

export async function ensurePriorityTables() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.derived_signals (
      order_id UUID PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE,
      is_delayed BOOLEAN NOT NULL DEFAULT false,
      delay_days INTEGER NOT NULL DEFAULT 0,
      is_blocked BOOLEAN NOT NULL DEFAULT false,
      blocked_reason TEXT,
      inactivity_hours NUMERIC,
      cascade_risk BOOLEAN NOT NULL DEFAULT false,
      cascade_reason TEXT,
      deadline_proximity TEXT,
      computed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS public.priority_scores (
      order_id UUID PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE,
      score NUMERIC NOT NULL DEFAULT 0,
      severity TEXT NOT NULL DEFAULT 'low',
      reason_codes JSONB NOT NULL DEFAULT '[]'::jsonb,
      recommended_action TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureSupplierPerformanceTables() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.supplier_performance_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      supplier_name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'fabric',
      buyer TEXT,
      order_ref TEXT,
      due_date TIMESTAMPTZ,
      actual_date TIMESTAMPTZ,
      quality_status TEXT NOT NULL DEFAULT 'PENDING',
      rejection_count INTEGER NOT NULL DEFAULT 0,
      delay_days INTEGER NOT NULL DEFAULT 0,
      remarks TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function ensureInitialCostingTable() {
  await ensureOrdersTable();

  await sql`
    CREATE TABLE IF NOT EXISTS public.initial_costings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      buyer TEXT NOT NULL,
      style_no TEXT NOT NULL,
      style_name TEXT,
      order_qty NUMERIC(12,2) NOT NULL DEFAULT 0,
      fabric_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
      trim_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
      process_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
      embroidery_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
      washing_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
      overhead NUMERIC(12,2) NOT NULL DEFAULT 0,
      margin NUMERIC(6,2) NOT NULL DEFAULT 20,
      final_fob NUMERIC(12,2) NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
