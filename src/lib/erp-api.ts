import { z } from "zod";

const coerceQueryNumber = (fallback: number, schema: z.ZodNumber) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === "") {
      return fallback;
    }
    return value;
  }, z.coerce.number().pipe(schema));

export const paginationQuerySchema = z.object({
  page: coerceQueryNumber(1, z.number().int().min(1)),
  limit: coerceQueryNumber(100, z.number().int().min(1).max(500)),
});

export const createOrderSchema = z.object({
  orderNo: z.string().min(1),
  styleDescription: z.string().min(1),
  qty: z.number().int().positive(),
  buyerId: z.string().min(1),
  unitId: z.string().min(1),
  month: z.string().min(1),
  specialWork: z.string().optional(),
  sam: z.number().optional(),
  totalQty: z.number().int().optional(),
  fabricSupplier: z.string().optional(),
  fabricInhDate: z.coerce.date().optional(),
  exFactoryDate: z.coerce.date().optional(),
  revisedExFactory: z.coerce.date().optional(),
  pcdPlan: z.coerce.date().optional(),
  fileHoDate: z.coerce.date().optional(),
  rdDate: z.coerce.date().optional(),
  ppComments: z.string().optional(),
  remarks: z.string().optional(),
  planStatus: z.string().optional(),
  fob: z.number().optional(),
  totalCost: z.number().optional(),
  producedSam: z.number().optional(),
  prodLeadTime: z.number().int().optional(),
});

export const updateOrderSchema = createOrderSchema.partial();

export const createMaterialRequisitionSchema = z.object({
  requisitionNo: z.string().optional(),
  requisitionDate: z.coerce.date(),
  company: z.string().default("CTA APPARELS PVT. LTD."),
  reqnType: z.string().min(1),
  requisitionFor: z.string().min(1),
  buyer: z.string().optional(),
  season: z.string().optional(),
  forLocation: z.string().optional(),
  preparedBy: z.string().optional(),
  deptFrom: z.string().optional(),
  deptTo: z.string().optional(),
  items: z.array(
    z.object({
      itemCategory: z.string().min(1),
      itemDesc: z.string().min(1),
      color: z.string().optional(),
      width: z.string().optional(),
      unit: z.string().optional(),
      reqnQty: z.number().optional(),
      rate: z.number().optional(),
      reqOn: z.coerce.date().optional(),
      remark: z.string().optional(),
    }),
  ),
});

export const updateDrEntrySchema = z
  .object({
    onMachine: z.string().optional(),
    offMachine: z.string().optional(),
    remarks: z.string().optional(),
  })
  .refine((data) => data.onMachine !== undefined || data.offMachine !== undefined || data.remarks !== undefined, {
    message: "At least one field is required.",
  });
