"use client";

import { Loader } from "@/components/loader";
import {
  Button,
  CustomToast,
  FilterableDropdown,
  ImageInput,
  Input,
  Textarea,
} from "@/shared-components";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/stores/services/product.service";
import { convertToFormData } from "@/utils/convert-to-form-data";
import { transformToOptions } from "@/utils/transform-to-options";
import { UpdateProductValidation } from "@/validations/product-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductEditPage = () => {
  const params = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(
    params.id as string,
  );
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const [productUpdate, { isLoading: isUpdating }] = useUpdateProductMutation();

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
      imgURL: undefined,
      barcode: undefined,
      price: "0",
      description: "",
      category: "",
    },
  });

  const modifiedCategories = transformToOptions(categories || []);

  useEffect(() => {
    if (product && categories) {
      reset({
        name: product.name,
        imgURL: product.imgURL ?? undefined,
        barcode: product.barcode ?? undefined,
        price: product.price,
        description: product.description,
        category: product.category?.name ?? undefined,
      });
    }
  }, [product, categories, reset]);

  const categoryName = categories?.find(
    (category) => category.name === product?.category?.name,
  )?.name;

  const onSubmit = async (data: FieldValues) => {
    const formattedData = convertToFormData(data);
    const response = await productUpdate({
      id: params.id as string,
      formData: formattedData,
    });
    if (response.data?.success) {
      toast(
        <CustomToast title="Product updated successfully" type="success" />,
      );
    } else {
      toast(<CustomToast title="Failed to update product" type="error" />);
    }
  };

  if (isLoading || isCategoriesLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <Controller
        name="imgURL"
        control={control}
        rules={{ required: "Image is required" }}
        render={({ field: { value, onChange } }) => (
          <ImageInput
            value={value ?? ""}
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
      <FilterableDropdown
        name="category"
        control={control}
        options={modifiedCategories}
        placeholder="Select a category"
        defaultText={categoryName}
        className="capitalize"
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
      <Button loading={isUpdating} className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ProductEditPage;
