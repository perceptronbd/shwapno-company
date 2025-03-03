"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Stock } from "@/stores/states/stock.states";
import ActionCell from "./action-cell";

export const getStockColumns = (): ColumnDef<Stock>[] => [
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ActionCell stock={row.original} row={row} />,
  },
];
