import { z } from "zod";

export const product = z.object({
  name: z.string().min(1, "Product Name is required"),
  image: z.any().refine((file) => file, { message: "Image is required" }),
  barcode: z.string().min(1, "Barcode is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  selectedCategory: z.string().min(1, "Category is required"),
});

export const CreateProductValidation = z.object({
  name: product.shape.name,
  image: product.shape.image,
  barcode: product.shape.barcode,
  price: product.shape.price,
  description: product.shape.description,
  selectedCategory: product.shape.selectedCategory,
});

export const UpdateProductValidation = z.object({
  name: product.shape.name.optional(),
  imgURL: product.shape.image.optional(),
  barcode: product.shape.barcode.optional(),
  price: product.shape.price.optional(),
  description: product.shape.description.optional(),
  selectedCategory: product.shape.selectedCategory.optional(),
});

export type CreateProductValidationType = z.infer<
  typeof CreateProductValidation
>;

export type UpdateProductValidationType = z.infer<
  typeof UpdateProductValidation
>;
