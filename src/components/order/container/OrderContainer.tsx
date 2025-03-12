"use client";

import { useGetOrdersByBranchQuery } from "@/stores/services/order.service";
import OrderTable from "../order-table/order-table";
import { BRANCH_ID } from "@/utils/constant";
import { Text } from "@/shared-components";
import { ErrorComponent } from "@/components/error";

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
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
        <Text variant="headerLarge" className="text-neutral-400">
          Loading...
        </Text>
      </div>
    );
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
