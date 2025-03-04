"use client";

import { useState } from "react";
import { getOrderColumns } from "./column";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
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
import { Order } from "@/stores/states/order.state";

interface OrderTableProps {
  readonly orderData: Order[];
}

const OrderTable = ({ orderData }: OrderTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = getOrderColumns();

  const table = useReactTable({
    data: orderData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      expanded,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
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
                      {!isActionColumn && header.column.getCanSort() && (
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
              <>
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-7 text-2xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="p-0">
                      <div className="bg-white p-4">
                        <div className="grid grid-cols-4 gap-4 text-2xs">
                          <div className="text-neutral-500">Barcode</div>
                          <div className="text-neutral-500">Product name</div>
                          <div className="text-neutral-500">Unit Price</div>
                          <div className="text-neutral-500">Quantity</div>
                          <div className="text-neutral-500">Amount</div>
                        </div>
                        {row.original.items.map((orderItem) =>
                          orderItem.product ? (
                            <div
                              key={orderItem.product.id}
                              className="mt-2 grid grid-cols-5 gap-4 text-2xs"
                            >
                              <div>{orderItem.product.barcode}</div>
                              <div>{orderItem.product.name}</div>
                              <div>{orderItem.price}</div>
                              <div>{orderItem.quantity}</div>
                              <div>
                                {(
                                  Number(orderItem.price) * orderItem.quantity
                                ).toFixed(2)}
                              </div>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-4 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
