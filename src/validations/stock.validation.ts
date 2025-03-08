import { z } from "zod";

export const stock = z.object({
  quantity: z.string().default("0").optional(),
  productId: z.string().min(1, "Product is required"),
});

export const CreateStockValidation = z.object({ ...stock.shape });
export const UpdateStockValidation = z.object({
  quantity: stock.shape.quantity.optional(),
});

export type CreateStock = z.infer<typeof CreateStockValidation>;
export type UpdateStock = z.infer<typeof UpdateStockValidation>;
