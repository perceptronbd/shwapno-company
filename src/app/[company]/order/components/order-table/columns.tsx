// file: columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./type";
import { Chips } from "@/shared-components";
import { Icons } from "../../../../../../utils";

type IconType = (typeof Icons)[keyof typeof Icons];

export const getOrderColumns = (
  toggleRow: (rowId: string) => void,
  expandedRows: { [key: string]: boolean },
): ColumnDef<Order>[] => [
  {
    id: "expand",
    header: "",
    cell: ({ row }) => {
      const isExpanded = expandedRows[row.id];
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleRow(row.id);
          }}
          className="p-2"
        >
          {isExpanded ? (
            <span>
              <Icons.ChevronUp />
            </span>
          ) : (
            <span>
              <Icons.ChevronDown />
            </span>
          )}
        </button>
      );
    },
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
      const status = row.getValue("status") as Order["status"];
      let variant: "success" | "warning" | "error" | "primary" = "primary";
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

      return <Chips variant={variant}>{label}</Chips>;
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
