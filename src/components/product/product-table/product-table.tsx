"use client";

import { useState } from "react";
import { Product } from "@/stores/states/product.state";
import { getProductColumns } from "./columns";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared-components";
import { ChevronDown } from "lucide-react";

interface ProductTableProps {
  readonly productData: Product[];
}

const ProductTable = ({ productData }: ProductTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = getProductColumns();

  const table = useReactTable({
    data: productData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="mb-10 mt-5 w-full overflow-auto rounded-lg border border-neutral-300 bg-neutral-50">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isActionColumn =
                  header.column.columnDef.header === "Action";

                return (
                  <TableHead
                    key={header.id}
                    className="py-5 text-center text-2xs"
                  >
                    <button
                      className={`flex items-center justify-center gap-1 ${
                        isActionColumn ? "" : "cursor-pointer select-none"
                      }`}
                      onClick={
                        isActionColumn
                          ? undefined
                          : header.column.getToggleSortingHandler()
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {!isActionColumn && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            header.column.getIsSorted() === "asc"
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // Check if this cell is for the category column
                  const cellValue =
                    cell.column.id === "category"
                      ? row.original.category?.name.trim()
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        );

                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-2 py-7 text-2xs ${cell.column.id === "category" ? "capitalize" : ""}`}
                    >
                      {cellValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-4 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
