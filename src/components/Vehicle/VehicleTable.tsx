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
import { GetVehicleVariants } from "@/lib/network/useVehicleVariant";
import { VehicleVariants } from "@/lib/types/vehicle";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function VehicleTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { categories } = GetVehicleVariants();
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
          <Select
            onValueChange={(value) => {
              if (value === "clear") {
                table.getColumn("variant")?.setFilterValue("");
              } else {
                table.getColumn("variant")?.setFilterValue(value);
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
                {categories?.map((category: VehicleVariants) => (
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
                table.getColumn("variant")?.setFilterValue("");
              } else {
                table.getColumn("variant")?.setFilterValue(value);
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
                {categories?.map((category: VehicleVariants) => (
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
          <Input
            placeholder="Search Police Number"
            value={
              (table.getColumn("police_number")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("police_number")
                ?.setFilterValue(event.target.value)
            }
            className="rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-end gap-6 p-6">
        <Button variant="muted" icon={<Upload size={20} strokeWidth={2.25} />}>
          Export
        </Button>
        <Link to="/vehicle-add">
          <Button
            variant="default"
            icon={<CirclePlus size={20} strokeWidth={2.25} />}
          >
            Add New Vehiclee
          </Button>
        </Link>
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
