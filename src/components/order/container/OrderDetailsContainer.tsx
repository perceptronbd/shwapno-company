"use client";
import {
  Button,
  Chips,
  CustomToast,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/shared-components";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/stores/services/order.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderDetailsContainer = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: order, isFetching, error } = useGetOrderByIdQuery(id);
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [status, setStatus] = useState<
    "success" | "error" | "warning" | "primary" | "disabled"
  >("success");

  // Separate loading states
  const [isApproving, setIsApproving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const orderData = order?.data;

  useEffect(() => {
    if (!orderData) return;
    if (orderData.status === "COMPLETED") {
      setStatus("success");
    } else if (orderData.status === "CANCELLED") {
      setStatus("error");
    } else {
      setStatus("warning");
    }
  }, [orderData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleApprove = async (id: string) => {
    setIsApproving(true);
    try {
      const response = await updateStatus({ id, status: "COMPLETED" });
      if (response.data?.success) {
        toast(
          <CustomToast title="Order approved successfully" type="success" />,
        );
      } else {
        toast(<CustomToast title="Failed to approve order" type="error" />);
      }
    } finally {
      setIsApproving(false);
    }
  };

  const handleDecline = async (id: string) => {
    setIsDeclining(true);
    try {
      const response = await updateStatus({ id, status: "CANCELLED" });
      if (response.data?.success) {
        toast(
          <CustomToast title="Order declined successfully" type="success" />,
        );
      } else {
        toast(<CustomToast title="Failed to decline order" type="error" />);
      }
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-full rounded-3xl bg-white p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <Text weight="bold" variant="titleLarge">
          Order Details
        </Text>
        <Chips rounded="lg" variant={status}>
          {orderData?.status}
        </Chips>
      </div>

      {/* Customer Details */}
      <div className="relative mb-6 mt-10">
        <Text
          variant="bodySmall"
          className="absolute -top-3 left-4 bg-white px-2 text-neutral-400"
        >
          Customer Details
        </Text>
        <div className="rounded-lg border border-neutral-400 p-4">
          <div className="grid grid-cols-3 gap-2 text-md">
            <span className="text-gray-500">Name</span>
            <span className="col-span-2">
              : {orderData?.customer.firstName} {orderData?.customer.lastName}
            </span>

            <span className="text-gray-500">Mobile</span>
            <span className="col-span-2">: {orderData?.customer.mobile}</span>

            <span className="text-gray-500">Email</span>
            <span className="col-span-2 truncate">
              : {orderData?.customer.email}
            </span>

            <span className="text-gray-500">Address</span>
            <span className="col-span-2">: {orderData?.customer.address}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <Text weight="bold" variant="bodyBase" className="mb-2">
          Product Details
        </Text>
        <div className="overflow-x-auto">
          <Table className="w-full text-xs">
            <TableHeader className="bg-neutral-200">
              <TableRow>
                <TableHead className="p-2 text-left">Barcode</TableHead>
                <TableHead className="p-2 text-left">Product Name</TableHead>
                <TableHead className="p-2 text-right">Unit Price</TableHead>
                <TableHead className="p-2 text-center">Qty</TableHead>
                <TableHead className="p-2 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData?.items.map((item) => (
                <TableRow key={item.product.barcode} className="border-b">
                  <TableCell className="p-2">
                    {item?.product?.barcode}
                  </TableCell>
                  <TableCell className="p-2">{item?.product?.name}</TableCell>
                  <TableCell className="p-2 text-right">
                    {item?.product?.price}
                  </TableCell>
                  <TableCell className="p-2 text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="p-2 text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total */}
        <div className="mt-2 bg-gray-200 p-3">
          <div className="text-right text-base font-bold">
            Total- {orderData?.totalAmount}Taka
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          loading={isApproving}
          disabled={isDeclining}
          onClick={() => handleApprove(orderData?.id ?? "")}
        >
          Approve
        </Button>
        <Button
          loading={isDeclining}
          disabled={isApproving}
          onClick={() => handleDecline(orderData?.id ?? "")}
          variant="outline"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsContainer;
