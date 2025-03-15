"use client";

import { Button, CustomToast, Input } from "@/shared-components";

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
import { toast } from "sonner";
import React, { useEffect } from "react";
import { Loader } from "@/components/loader";
import { ErrorComponent } from "@/components/error";

// Define the form values type

const EditStock = () => {
  const params = useParams();
  const stockId = params.id as string;
  const { data: stock, isFetching, error } = useGetStockByIdQuery(stockId);
  const [updateStock] = useUpdateStockMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateStockValidation),
    defaultValues: {
      quantity: "",
    },
  });

  useEffect(() => {
    if (stock) {
      const quantity = String(stock.quantity);
      reset({ quantity });
    }
  }, [stock, reset]);

  const onSubmit = async (data: UpdateStock) => {
    const stockData = {
      quantity: Number(data.quantity),
      productId: stock?.productId,
    };

    const response = await updateStock(stockData);
    if (response.data?.success) {
      toast(<CustomToast title="Stock updated successfully" type="success" />);
    } else {
      toast(<CustomToast title="Failed to update stock" type="error" />);
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <Input
          placeholder="quantity"
          type="number"
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
