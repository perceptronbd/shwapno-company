"use client";

import { useGetOrdersByBranchQuery } from "@/stores/services/order.service";
import OrderTable from "../order-table/order-table";
import { ErrorComponent } from "@/components/error";
import { selectSelectedBranchId } from "@/stores/slices/auth.slice";
import { useAppSelector } from "@/stores/hook";
import { Loader } from "@/components/loader";

const OrderContainer = () => {
  const branchId = useAppSelector(selectSelectedBranchId);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersByBranchQuery({
    branchId: branchId ?? "",
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent />;
  }
  return (
    <div className="h-full w-full pb-10">
      <OrderTable orderData={orders?.data.orders || []} />
    </div>
  );
};

export default OrderContainer;
