"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Product } from "@/stores/states/product.state";
import { ActionMenu } from "@/components/action-menu";

type ActionType = "View" | "Edit" | "Delete" | "See Log";

export const getProductColumns = (): ColumnDef<Product>[] => [
  {
    accessorKey: "barcode",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Unite Price",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <ActionMenu
        options={["View", "Edit", "Delete", "See Log"]}
        onSelect={(action: ActionType, row: Row<Product>) => {
          console.log(`Action: ${action} for`, row.original);
        }}
        row={row}
      />
    ),
  },
];
