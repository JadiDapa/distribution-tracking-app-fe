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
import useAuthStore from "@/lib/store/AuthStore";
import { GetAccountById } from "@/lib/network/useAccounts";
import DataLoading from "../ui/DataLoading";
import { Accounts } from "@/lib/types/account";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function RequestInboxTable<TData, TValue>({
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
        <div className="p-6">
          <div className="text-lg">Search Filters</div>
          <div className="mt-4 grid grid-cols-3 gap-6">
            <Select
              onValueChange={(value) => {
                if (value === "clear") {
                  table.getColumn("requester")?.setFilterValue("");
                } else {
                  table.getColumn("requester")?.setFilterValue(value);
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
        <div className="flex justify-end gap-4 px-6 py-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search Request Code"
              value={
                (table.getColumn("code")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("code")?.setFilterValue(event.target.value)
              }
              className="h-10 rounded-md border text-base transition-all duration-500 focus:border-transparent focus:outline-none focus:outline-transparent focus:ring-2 focus:ring-primary"
            />
            <Button
              variant="muted"
              icon={<Upload size={20} strokeWidth={2.25} />}
            >
              Export
            </Button>
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
        <hr />
        <Pagination table={table} />
      </div>
    );
  }
}
