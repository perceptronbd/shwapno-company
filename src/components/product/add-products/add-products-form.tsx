"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Button, ImageInput, Input, InputSelect } from "@/shared-components";
import { Textarea } from "@/shared-components/src/components/inputs/textarea/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductValidation } from "@/validations/product-validation";
import { useGetCategoriesQuery } from "@/stores/services/product.service";

const AddProductsForm = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CreateProductValidation) });

  const onSubmit = (data: FieldValues) => {
    console.log("Form Submitted", data);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching categories</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <ImageInput
        {...register("image", { required: "Image is required" })}
        error={errors.image?.message}
      />
      <Input
        placeholder="Barcode"
        type="text"
        {...register("barcode", { required: true })}
        error={errors.barcode?.message}
        className={
          "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
      />
      <InputSelect
        {...register("selectedCategory", { required: true })}
        placeholder="Select Category"
        categories={categories ?? []}
        error={errors.selectedCategory?.message}
      />
      <Input
        placeholder="price"
        type="number"
        {...register("price", { required: true })}
        className={
          "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
        error={errors.price?.message}
      />
      <Textarea
        placeholder="description"
        {...register("description", { required: true })}
        className={
          "h-40 rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
        error={errors.description?.message}
      />
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProductsForm;
