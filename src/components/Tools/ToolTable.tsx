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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { GetToolCategories } from "@/lib/network/useToolCategory";
import { ToolCategory } from "@/lib/types/tool";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function ToolTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { categories } = GetToolCategories();
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
      <div className="p-4 lg:p-6">
        <div className="text-lg">Search Filters</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-6">
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("category")?.setFilterValue("");
              } else {
                table.getColumn("category")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className="mt-1.5 text-base text-slate-600"
                  value="clear"
                >
                  Select Category
                </SelectItem>
                {categories?.map((category: ToolCategory) => (
                  <SelectItem
                    key={category.id}
                    className="mt-1.5 text-base text-slate-600"
                    value={category.category}
                  >
                    {category.category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("status")?.setFilterValue("");
              } else {
                table.getColumn("status")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="clear"
                  className="mt-1.5 text-base text-slate-600"
                >
                  Select Status
                </SelectItem>
                <SelectItem
                  value="available"
                  className="mt-1.5 text-base text-slate-600"
                >
                  Available
                </SelectItem>
                <SelectItem
                  value="unavailable"
                  className="mt-1.5 text-base text-slate-600"
                >
                  Unavailable
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search Tool"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-end gap-4 p-6 lg:flex-row">
        <Button
          variant="muted"
          icon={<Upload size={20} strokeWidth={2.25} />}
          className="h-9 w-full lg:max-w-fit "
        >
          Export
        </Button>
        <Link to="/tool-add">
          <Button
            variant="default"
            className="max-lg:w-full"
            icon={<CirclePlus size={20} strokeWidth={2.25} />}
          >
            Add New Tool
          </Button>
        </Link>
      </div>
      <hr />
      <Table className="max-lg:hidden">
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
      {/* Mobile Table */}
      <Table className="lg:hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl font-medium ">Tool List</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                className="flex items-center justify-between px-4 py-2"
              >
                <div className="flex h-full flex-col gap-1">
                  <div className="text-start font-medium">
                    {flexRender(
                      row.getVisibleCells()[1].column.columnDef.cell,
                      row.getVisibleCells()[1].getContext(),
                    )}
                  </div>
                  <div className="text-sm">
                    {flexRender(
                      row.getVisibleCells()[2].column.columnDef.cell,
                      row.getVisibleCells()[2].getContext(),
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-end">
                  <div className="">
                    {flexRender(
                      row.getVisibleCells()[3].column.columnDef.cell,
                      row.getVisibleCells()[3].getContext(),
                    )}
                  </div>
                  <div>
                    {flexRender(
                      row.getVisibleCells()[5].column.columnDef.cell,
                      row.getVisibleCells()[5].getContext(),
                    )}
                  </div>
                </div>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <hr />
      <Pagination table={table} />
    </div>
  );
}
