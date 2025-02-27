"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Button, ImageInput, Input } from "@/shared-components";
import { Textarea } from "@/shared-components/src/components/inputs/textarea/textarea";
import { AddStock } from "./add-stock";

const AddProductsForm = () => {
  const methods = useForm();
  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FieldValues) => {
    console.log("Form Submitted", data);
  };
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <ImageInput
        {...register("image", { required: "Image is required" })}
        error={errors.root?.message as string}
      />
      <Input
        placeholder="Barcode"
        type="text"
        {...register("barcode", { required: true })}
        className={
          "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
      />
      <Input
        placeholder="price"
        type="number"
        {...register("price", { required: true })}
        className={
          "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
      />
      <Textarea
        placeholder="description"
        {...register("description", { required: true })}
        className={
          "h-40 rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
        }
      />
      <AddStock />
      <Button className="w-full" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProductsForm;
