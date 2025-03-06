"use client";

import { Button, Input } from "@/shared-components";
import { FilterableDropdown } from "@/shared-components/src/components/inputs/filterable-dropdown/filterable.dropdown";
import { transformToOptions } from "@/utils/transform-to-options";
import { useGetProductsQuery } from "@/stores/services/product.service";
import {
  CreateStock,
  CreateStockValidation,
} from "@/validations/stock.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddStockMutation } from "@/stores/services/stock.service";

// Define the form values type

const AddStock = () => {
  const { data: products } = useGetProductsQuery();
  const [addStock] = useAddStockMutation();
  const modifiedProducts = transformToOptions(products || []);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: "",
      productId: "",
    },
    resolver: zodResolver(CreateStockValidation),
  });

  const onSubmit = async (data: CreateStock) => {
    const stockData = {
      quantity: Number(data.quantity),
      productId: data.productId,
    };

    const response = await addStock(stockData);
    console.log(response);
    // Process form data
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <FilterableDropdown
          name="productId"
          control={control}
          options={modifiedProducts}
          placeholder="Select Product"
        />

        <Input
          placeholder="Quantity"
          type="number"
          {...register("quantity", { required: true })}
          className={
            "rounded-md border-neutral-300 focus:border-none focus:outline-primary-300"
          }
          error={errors.quantity?.message}
        />

        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddStock;
