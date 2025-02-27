import { z } from "zod";

export const CreateProductValidation = z.object({
  name: z.string().min(1, "Product Name is required"),
  image: z.any().refine((file) => file, { message: "Image is required" }),
  barcode: z.string().min(1, "Barcode is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  selectedCategory: z.string().min(1, "Category is required"),
});

export type CreateProductValidationType = z.infer<
  typeof CreateProductValidation
>;
