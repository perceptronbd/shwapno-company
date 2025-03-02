"use client";

import { useState } from "react";
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
import { Stock } from "@/stores/states/stock.states";
import { getStockColumns } from "./columns";

interface StockTableProps {
  readonly stockData: Stock[];
}

const StockTable = ({ stockData }: StockTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = getStockColumns();

  const table = useReactTable({
    data: stockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="mt-5 w-full overflow-auto rounded-lg border border-neutral-300 bg-neutral-50">
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
                    <div
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
                    </div>
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-2 py-7 text-2xs">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
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

export default StockTable;
