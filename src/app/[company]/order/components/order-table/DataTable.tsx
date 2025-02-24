"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  OnChangeFn,
  useReactTable,
  type ExpandedState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared-components";
import { getOrderColumns } from "./columns";
import type { Order } from "./type";

interface DataTableProps {
  readonly data: Order[];
}

export function DataTable({ data }: DataTableProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpandedChange: OnChangeFn<ExpandedState> = (updater) => {
    setExpanded((prev) =>
      typeof updater === "function" ? updater(prev) : { ...updater },
    );
  };

  const columns = getOrderColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: handleExpandedChange,
    state: { expanded },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="py-7" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody key={table.getRowModel().rows.length}>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <>
                <TableRow
                  key={row.id}
                  onClick={() => row.toggleExpanded()}
                  className="cursor-pointer border-none hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-7" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`}>
                    <TableCell colSpan={columns.length}>
                      <div className="bg-gray-50 p-4">
                        <p>
                          <strong>Address:</strong> {row.original.address}
                        </p>
                        <p>
                          <strong>Date:</strong> {row.original.date}
                        </p>
                        {row.original.note && (
                          <p>
                            <strong>Note:</strong> {row.original.note}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
