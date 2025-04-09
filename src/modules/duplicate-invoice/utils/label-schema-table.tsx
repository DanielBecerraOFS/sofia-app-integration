import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const invoiceSchema = z.object({
  id: z.string(),
  reference:z.string(),
  vendor: z.string(),
  pattern: z.string(),
  open: z.boolean(),
  group_id: z.string(),
  date: z.string(),
  pay_date: z.string(),
  value: z.number(),
  confidence: z.string(),
  region: z.string(),
  payment_method: z.string(),
  description: z.string(),
  special_instructions: z.string(),
  accuracy: z.number(),
  quantity: z.number(),
  unit_price: z.number(),
})

export const groupedInvoiceSchema = z.object({
  pattern: z.string(),
  open: z.boolean(),
  date: z.string(),
  confidence: z.string(),
  region: z.string(),
  amount_overpaid: z.number(),
})

export type TableLabel = z.infer<typeof invoiceSchema>
export type TableGroupedLabel = z.infer<typeof groupedInvoiceSchema>