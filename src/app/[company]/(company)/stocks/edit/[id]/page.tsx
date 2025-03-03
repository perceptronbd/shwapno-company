"use client";

import { Button, Input } from "@/shared-components";

import {
  UpdateStock,
  UpdateStockValidation,
} from "@/validations/stock.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useGetStockByIdQuery,
  useUpdateStockMutation,
} from "@/stores/services/stock.service";
import { useParams } from "next/navigation";

// Define the form values type

const EditStock = () => {
  const params = useParams();
  const stockId = params.id as string;
  const { data: stock, isFetching, error } = useGetStockByIdQuery(stockId);
  const [updateStock] = useUpdateStockMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateStockValidation),
  });

  const onSubmit = async (data: UpdateStock, e: any) => {
    e.preventDefault();
    const stockData = {
      quantity: Number(data.quantity),
      productId: stock?.productId,
    };

    const response = await updateStock(stockData);
    console.log(response);
    // Process form data
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <Input
          placeholder="quantity"
          type="number"
          value={String(stock?.quantity)}
          {...register("quantity")}
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

export default EditStock;
