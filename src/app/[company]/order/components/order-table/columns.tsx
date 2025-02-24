// file: columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./type";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Chips } from "@/shared-components";

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => (
      <button
        aria-label={expandedRows[row.id] ? "Collapse row" : "Expand row"}
        onClick={() => toggleRow(row.id)}
      >
        {expandedRows[row.id] ? <ChevronUp /> : <ChevronDown />}
      </button>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let variant: "success" | "warning" | "error" | "primary";
      let label = status;

      switch (status) {
        case "Delivered":
          variant = "success";
          label = "Delivered";
          break;
        case "Pending":
          variant = "warning";
          label = "Pending";
          break;
        case "Declined":
          variant = "error";
          label = "Declined";
          break;
        default:
          variant = "error";
          break;
      }

      return (
        <Chips className="p-1 text-2xs" rounded="full" variant={variant}>
          {label}
        </Chips>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return <div className="text-right">{formatted}</div>;
    },
  },
];
