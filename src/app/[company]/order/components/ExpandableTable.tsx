"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared-components";

interface Column {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: "expand", label: "" },
  { key: "name", label: "Name" },
  { key: "action", label: "Action" },
];

interface DataRow {
  id: number;
  name: string;
  details: string;
  actionLabel: string;
}

const data: DataRow[] = [
  {
    id: 1,
    name: "Item One",
    details: "Details about Item One",
    actionLabel: "Edit",
  },
  {
    id: 2,
    name: "Item Two",
    details: "Details about Item Two",
    actionLabel: "Delete",
  },
  {
    id: 3,
    name: "Item Three",
    details: "Details about Item Three",
    actionLabel: "View",
  },
];

export default function ExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <>
            <TableRow key={row.id}>
              <TableCell>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem key={row.id} value={`row-${row.id}`}>
                    <AccordionTrigger onClick={() => toggleRow(row.id)} />
                  </AccordionItem>
                </Accordion>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  {row.actionLabel}
                </Button>
              </TableCell>
            </TableRow>
            {expandedRows.includes(row.id) && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="bg-gray-100 p-4 text-gray-700"
                >
                  {row.details}
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
