import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import { materialCategoryFilter, materialStatusFilter } from "@/utils/static";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CirclePlus, Upload } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="box-shadow w-full rounded-md bg-white">
      <div className="p-6">
        <div className="text-xl">Filters</div>
        <div className="mt-4 grid grid-cols-3 gap-6">
          <Select>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {materialCategoryFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  onChange={() =>
                    table.getColumn("category")?.setFilterValue(option.value)
                  }
                  className="mt-1.5 text-base text-slate-600"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {materialStatusFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="mt-1.5 text-base text-slate-600"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search Material"
            value={
              (table.getColumn("material")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("material")?.setFilterValue(event.target.value)
            }
            className="rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <hr />
      <div className="flex justify-end gap-4 p-6">
        <div className="w-28">
          <Select>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {materialStatusFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="mt-1.5 text-base text-slate-600"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="muted" icon={<Upload size={20} strokeWidth={2.25} />}>
          Export
        </Button>
        <Button
          variant="default"
          icon={<CirclePlus size={20} strokeWidth={2.25} />}
        >
          Add New User
        </Button>
      </div>
      <hr />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <hr />
      <Pagination table={table} />
    </div>
  );
}
