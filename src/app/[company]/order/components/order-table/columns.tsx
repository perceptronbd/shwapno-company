// file: columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./type";
import {
  Chips,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared-components";

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    id: "expand",
    header: "",
    cell: ({ row }) => {
      return (
        <Accordion type="single" collapsible>
          <AccordionItem value={row.id}>
            <AccordionTrigger className="flex items-center justify-center rounded-full bg-neutral-200 p-1 text-neutral-400"></AccordionTrigger>
            <AccordionContent>
              {/* Row details go here */}
              <div className="p-4">Expanded content for {row.id}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
