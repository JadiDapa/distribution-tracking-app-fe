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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Diff, Upload } from "lucide-react";
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
import useAuthStore from "@/lib/store/AuthStore";
import { GetAccountById } from "@/lib/network/useAccounts";
import DataLoading from "../ui/DataLoading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function ToolUpdatesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { userData } = useAuthStore();
  const { account, isLoading, isError } = GetAccountById(
    userData?.id.toString(),
  );

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

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (account) {
    return (
      <div className="box-shadow w-full rounded-md bg-white">
        <hr />
        <div className="flex flex-col justify-end gap-4 px-4 py-6 lg:flex-row lg:px-6">
          <Input
            placeholder="Search Request Code"
            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("code")?.setFilterValue(event.target.value)
            }
            className="h-10 rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary lg:max-w-fit"
          />
          <Button
            variant="muted"
            icon={<Upload size={20} strokeWidth={2.25} />}
          >
            Export
          </Button>
          <Link to="/tool-quantity">
            <Button
              variant="default"
              icon={<Diff size={20} strokeWidth={2.25} />}
              className="w-full lg:w-auto"
            >
              Update Quantity
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
              <TableHead className="text-xl font-medium ">
                Tool Update Histories
              </TableHead>
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
                      #
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
                    <div>
                      {flexRender(
                        row.getVisibleCells()[3].column.columnDef.cell,
                        row.getVisibleCells()[3].getContext(),
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
}
