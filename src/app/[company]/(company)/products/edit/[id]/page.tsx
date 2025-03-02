"use client";

import {
  Button,
  ImageInput,
  Input,
  InputSelect,
  Textarea,
} from "@/shared-components";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} from "@/stores/services/product.service";
import { UpdateProductValidation } from "@/validations/product-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

const ProductEditPage = () => {
  const params = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(params.id as string);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateProductValidation),
    defaultValues: {
      name: "",
      imgURL: "",
      barcode: undefined,
      price: "0",
      description: "",
      selectedCategory: "",
    },
  });

  const categoryName =
    categories?.find((c) => c.id === product?.categoryId)?.name ?? "";

  useEffect(() => {
    if (product && categories) {
      reset({
        name: product.name,
        imgURL: product.imgURL ?? undefined,
        barcode: product.barcode ?? undefined,
        price: product.price,
        description: product.description,
        selectedCategory: categoryName,
      });
    }
  }, [product, categories, reset, categoryName]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  if (isLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (error || categoriesError) {
    return <div>Error</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <Controller
        name="imgURL"
        control={control}
        rules={{ required: "Image is required" }}
        render={({ field: { value, onChange } }) => (
          <ImageInput
            value={value}
            onChange={onChange}
            error={errors.imgURL?.message}
          />
        )}
      />
      <Input
        placeholder="Product Name"
        type="text"
        {...register("name", { required: true })}
        error={errors.name?.message}
        className={
          "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
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
        searchString={categoryName}
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

export default ProductEditPage;
