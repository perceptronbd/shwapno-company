"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/stores/states/product.state";
import { ActionMenu } from "@/components/action-menu";

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
    cell: ({ row }) => (
      <ActionMenu<Product, "View" | "Edit" | "Delete" | "See Log">
        options={["View", "Edit", "Delete", "See Log"]}
        onSelect={(action, row) => {
          console.log(`Action: ${action} for`, row.original);
        }}
        row={row}
      />
    ),
  },
];
