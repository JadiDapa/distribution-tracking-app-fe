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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { materialCategoryFilter, materialStatusFilter } from "@/utils/static";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Bus,
  Cable,
  Car,
  CarFront,
  CirclePlus,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/Pagination";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function AccountTable<TData, TValue>({
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
        <div className="text-lg">Search Filters</div>
        <div className="mt-4 grid grid-cols-3 gap-6">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {materialCategoryFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="mt-1.5 text-slate-600"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {materialStatusFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="mt-1.5 text-slate-600"
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
        </div>
      </div>
      <hr />
      <div className="flex justify-between gap-4 px-6 py-6">
        <div className="w-28">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {materialStatusFilter.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="mt-1.5 text-slate-600"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Input
            placeholder="Search Account"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-64 rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary"
          />
          <Button
            variant="muted"
            icon={<Upload size={20} strokeWidth={2.25} />}
          >
            Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="default"
                icon={<CirclePlus size={20} strokeWidth={2.25} />}
              >
                Create New Request
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Select item type you want to request
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You can only choose one type of item to request, you can make
                  another request if you want to ask for other item type
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Link to="/request-item/material">
                  <AlertDialogAction className="flex gap-2 bg-primary hover:opacity-95">
                    Material
                    <Cable size={20} />
                  </AlertDialogAction>
                </Link>
                <Link to="/request-item/tool">
                  <AlertDialogAction className="flex gap-2 bg-teal-400 hover:bg-teal-600">
                    Tool
                    <Wrench size={20} />
                  </AlertDialogAction>
                </Link>
                <Link to="/request-item/vehicle">
                  <AlertDialogAction className="flex gap-2 bg-yellow-400 hover:bg-yellow-600">
                    Vehicle
                    <CarFront size={20} />
                  </AlertDialogAction>
                </Link>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
