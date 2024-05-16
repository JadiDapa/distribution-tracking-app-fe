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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Cable, CirclePlus, Upload, Wrench } from "lucide-react";
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
import useAuthStore from "@/lib/store/AuthStore";
import { GetAccountById } from "@/lib/network/useAccounts";
import DataLoading from "../ui/DataLoading";
import { Accounts } from "@/lib/types/account";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function RequestTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { userData } = useAuthStore();
  const { account, isLoading, isError } = GetAccountById(
    userData?.id.toString(),
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const lowerAccounts = account?.lowerAccounts;

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
        <div className="p-4 lg:p-6">
          <div className="text-lg">Search Filters</div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-6">
            <Select
              onValueChange={(value) => {
                if (value === "clear") {
                  table.getColumn("requested")?.setFilterValue("");
                } else {
                  table.getColumn("requested")?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Requested Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="clear"
                  >
                    Select Requested Account
                  </SelectItem>
                  {lowerAccounts?.map((account: Accounts) => (
                    <SelectItem
                      key={account.id}
                      className="mt-1.5 text-base text-slate-600"
                      value={account.name}
                    >
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                if (value === "clear") {
                  table.getColumn("type")?.setFilterValue("");
                } else {
                  table.getColumn("type")?.setFilterValue(value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="clear"
                  >
                    Select Request Type
                  </SelectItem>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="material"
                  >
                    Material
                  </SelectItem>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="tool"
                  >
                    Tool
                  </SelectItem>
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
                <SelectValue placeholder="Select Request Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="clear"
                  >
                    Select Request Status
                  </SelectItem>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="accepted"
                  >
                    Accepted
                  </SelectItem>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="pending"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    className="mt-1.5 text-base text-slate-600"
                    value="rejected"
                  >
                    Rejected
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-end gap-4 p-4 lg:flex-row lg:p-6">
          <Input
            placeholder="Search Request Code"
            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("code")?.setFilterValue(event.target.value)
            }
            className="block h-10 rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary lg:flex lg:max-w-fit"
          />
          <Button
            variant="muted"
            icon={<Upload size={20} strokeWidth={2.25} />}
            className="h-9 w-full lg:max-w-fit "
          >
            Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="default"
                icon={<CirclePlus size={20} strokeWidth={2.25} />}
                className="max-lg:w-full"
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
              <AlertDialogFooter className="flex flex-col gap-3 lg:flex-row lg:gap-0">
                <Link to="/request-item/material">
                  <AlertDialogAction className="flex gap-2 bg-primary hover:opacity-95 max-lg:w-full">
                    Material
                    <Cable size={20} />
                  </AlertDialogAction>
                </Link>
                <Link to="/request-item/tool">
                  <AlertDialogAction className="flex gap-2 bg-teal-400 hover:bg-teal-600 max-lg:w-full">
                    Tool
                    <Wrench size={20} />
                  </AlertDialogAction>
                </Link>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                Request Sent List
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
                      {flexRender(
                        row.getVisibleCells()[1].column.columnDef.cell,
                        row.getVisibleCells()[1].getContext(),
                      )}
                    </div>
                    <div className="text-sm">
                      {flexRender(
                        row.getVisibleCells()[3].column.columnDef.cell,
                        row.getVisibleCells()[3].getContext(),
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-end">
                    <div className="">
                      {flexRender(
                        row.getVisibleCells()[5].column.columnDef.cell,
                        row.getVisibleCells()[5].getContext(),
                      )}
                    </div>
                    <div>
                      {flexRender(
                        row.getVisibleCells()[2].column.columnDef.cell,
                        row.getVisibleCells()[2].getContext(),
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
