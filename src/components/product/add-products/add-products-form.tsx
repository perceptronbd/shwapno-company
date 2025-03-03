"use client";

import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Button,
  FilterableDropdown,
  ImageInput,
  Input,
} from "@/shared-components";
import { Textarea } from "@/shared-components/src/components/inputs/textarea/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductValidation } from "@/validations/product-validation";
import {
  useAddProductMutation,
  useGetCategoriesQuery,
} from "@/stores/services/product.service";
import { BRANCH_ID } from "../../../utils/constants";
import { AddProduct } from "@/stores/states/product.state";
import { convertToFormData } from "../../../utils/convert-to-form-data";
import { transformToOptions } from "@/utils/transform-to-options";

const AddProductsForm = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();

  const modifiedCategories = transformToOptions(categories || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CreateProductValidation) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const newProduct: AddProduct = {
      name: data.name,
      barcode: data.barcode,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      image: data.image,
    };

    const newFormData = convertToFormData(newProduct);

    const response = addProduct({ branchId: BRANCH_ID, formData: newFormData });
    console.log(response);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching categories</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <Controller
        name="image"
        control={control}
        rules={{ required: "Image is required" }}
        render={({ field: { value, onChange } }) => (
          <ImageInput
            value={value}
            onChange={onChange}
            error={errors.image?.message}
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
        name="categoryId"
        control={control}
        options={modifiedCategories}
        placeholder="Select a category"
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
      <Button loading={isAddingProduct} className="w-full" type="submit">
        Add
      </Button>
    </form>
  );
};

export default AddProductsForm;
