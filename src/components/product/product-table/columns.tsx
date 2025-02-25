"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/stores/states/product.state";
import ActionCell from "@/components/product/product-table/action-cell";

export const getProductColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: "barcode",
    header: "Barcode",
    minSize: 46,
  },
  {
    accessorKey: "name",
    header: "Product Name",
    minSize: 136,
  },
  {
    accessorKey: "category",
    header: "Category",
    minSize: 46,
  },
  {
    accessorKey: "price",
    header: "Unite Price",
    minSize: 46,
  },
  {
    accessorKey: "action",
    header: "Action",
    minSize: 32,
    cell: ({ row }) => <ActionCell product={row.original} row={row} />,
  },
];
