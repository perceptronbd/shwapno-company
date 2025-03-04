"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared-components";
import { MoreVertical, ChevronDown, ChevronRight } from "lucide-react";
import { Order } from "@/stores/states/order.state";

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    id: "expand",
    header: "",
    cell: ({ row }) => {
      return (
        <Button
          variant="text"
          size="sm"
          onClick={() => row.toggleExpanded()}
          className="p-0"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-center">{row.original.customer.firstName}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="text-center">{row.original.customer.mobile}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let statusClass = "bg-yellow-100 text-yellow-800"; // Default for Pending

      if (status === "COMPLETED") {
        statusClass = "bg-green-100 text-green-800";
      } else if (status === "CANCELLED") {
        statusClass = "bg-red-100 text-red-800";
      }

      return (
        <div className="flex justify-center">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="text-center">{row.original.totalAmount}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="flex justify-center">
        <Button variant="text" size="sm" className="p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
