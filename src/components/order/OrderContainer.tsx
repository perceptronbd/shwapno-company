"use client";

import { useGetOrdersByBranchQuery } from "@/stores/services/order.service";
import { BRANCH_ID } from "@/utils/constants";
import OrderTable from "./order-table/order-table";

const OrderContainer = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersByBranchQuery({
    branchId: BRANCH_ID,
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="h-screen w-full bg-white px-4">
      <OrderTable orderData={orders?.data.orders || []} />
    </div>
  );
};

export default OrderContainer;
