"use client";

import { Button, CustomToast, Input } from "@/shared-components";
import { FilterableDropdown } from "@/shared-components/src/components/inputs/filterable-dropdown/filterable.dropdown";
import { transformToOptionsWithId } from "@/utils/transform-to-options";
import { useGetProductsQuery } from "@/stores/services/product.service";
import {
  CreateStock,
  CreateStockValidation,
} from "@/validations/stock.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddStockMutation } from "@/stores/services/stock.service";
import { toast } from "sonner";
import { useAppSelector } from "@/stores/hook";
import { selectSelectedBranchId } from "@/stores/slices/auth.slice";

// Define the form values type

const AddStock = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  const [addStock] = useAddStockMutation();
  const modifiedProducts = transformToOptionsWithId(products || []);
  const branchId = useAppSelector(selectSelectedBranchId);

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

    const response = await addStock({ stock: stockData, branchId });

    if (response.data?.success) {
      toast(<CustomToast title="Stock added successfully" type="success" />);
    } else {
      toast(<CustomToast title="Failed to add stock" type="error" />);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <FilterableDropdown
          disabled={isFetching}
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
