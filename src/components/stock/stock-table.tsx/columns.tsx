"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Stock } from "@/stores/states/stock.states";

export const getStockColumns = (): ColumnDef<Stock>[] => [
  {
    accessorKey: "product.barcode",
    header: "Barcode",
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div>will render {row.original.branch.location}</div>,
  },
];
