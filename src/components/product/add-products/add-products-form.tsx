"use client";

import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Button,
  CustomToast,
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

import { convertToFormData } from "../../../utils/convert-to-form-data";
import { transformToOptions } from "@/utils/transform-to-options";
import { toast } from "sonner";
import { BRANCH_ID } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

const AddProductsForm = () => {
  const router = useRouter();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();

  const modifiedCategories = transformToOptions(categories || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CreateProductValidation) });

  const onSubmit = async (data: FieldValues) => {
    const newProduct = {
      name: data.name,
      barcode: data.barcode,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
    };

    const newFormData = convertToFormData(newProduct);

    const response = await addProduct({
      branchId: BRANCH_ID,
      formData: newFormData,
    });
    if (response.data?.success) {
      toast(
        <CustomToast
          title="Product added successfully"
          description="The process was successful."
          type="success"
        />,
      );
      router.replace(ROUTES.PRODUCTS);
    } else {
      toast(
        <CustomToast
          title="Failed to add product"
          description="Something went wrong!"
          type="error"
        />,
      );
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
            className="h-60 w-full rounded-md border-neutral-300"
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
        name="category"
        control={control}
        options={modifiedCategories}
        creatable
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
