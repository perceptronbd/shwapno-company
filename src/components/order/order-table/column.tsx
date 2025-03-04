"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, Chips } from "@/shared-components";
import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Order } from "@/stores/states/order.state";

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    id: "expand",
    header: "",
    minSize: 60,
    cell: ({ row }) => {
      return (
        <Button
          variant="text"
          size="sm"
          onClick={() => row.toggleExpanded()}
          className="rounded-full bg-neutral-200 p-2 font-bold text-neutral-400"
        >
          {!row.getIsExpanded() ? (
            <ChevronDown strokeWidth={2} className="h-4 w-4" />
          ) : (
            <ChevronUp strokeWidth={2} className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    minSize: 60,
    cell: ({ row }) => (
      <div className="text-center">{row.original.customer.firstName}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    minSize: 60,
    cell: ({ row }) => (
      <div className="text-center">{row.original.customer.mobile}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    minSize: 60,
    cell: ({ row }) => {
      const status = row.original.status;
      let statusClass: "error" | "success" | "warning";

      if (status === "COMPLETED") {
        statusClass = "success";
      } else if (status === "CANCELLED") {
        statusClass = "error";
      } else {
        statusClass = "warning";
      }

      return (
        <Chips rounded="lg" className="p-1 text-2xs" variant={statusClass}>
          {status}
        </Chips>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    minSize: 60,
    cell: ({ row }) => (
      <div className="text-center">{row.original.totalAmount}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    minSize: 40,
    cell: () => (
      <div className="flex justify-center">
        <Button variant="text" size="sm" className="p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
