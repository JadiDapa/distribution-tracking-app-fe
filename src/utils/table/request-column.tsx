import DeleteRow from "@/components/ui/DeleteRow";
import TableSorter from "@/components/ui/TableSorter";
import { Requests } from "@/lib/types/request";
import { RequestedItems } from "@/lib/types/requestItem";
import { ColumnDef } from "@tanstack/react-table";
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Cable,
  Eye,
  Wrench,
} from "lucide-react";

export const requestColumns: ColumnDef<Requests>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="pl-4">
        <TableSorter column={column} header="#" />
      </div>
    ),
    cell: ({ row }) => <div className="ml-4 text-primary">{row.index + 1}</div>,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <TableSorter column={column} header="REQUEST CODE" />
    ),
  },
  {
    accessorKey: "requested.name",
    header: ({ column }) => <TableSorter column={column} header="REQUESTED" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableSorter column={column} header="ITEM TYPE" />,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === "material") {
        return (
          <div className="flex items-center gap-2 rounded-md font-semibold capitalize text-primary">
            Material
            <span>
              <Cable size={18} />
            </span>
          </div>
        );
      }
      if (value === "tool") {
        return (
          <div className="flex items-center gap-2 rounded-md font-semibold capitalize text-teal-500">
            Tool
            <span>
              <Wrench size={18} />
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ getValue }) => {
      const getItemsObject = getValue() as RequestedItems[];
      const getItemsQuantity = getItemsObject.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      return <div className="capitalize">{getItemsQuantity}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === "accepted") {
        return (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-green-400 px-3 py-1.5 text-sm capitalize text-white">
            Accepted
            <span>
              <ArchiveRestore size={18} />
            </span>
          </div>
        );
      }
      if (value === "pending") {
        return (
          <div className="accepted flex max-w-fit items-center gap-2 rounded-md bg-yellow-500 px-3 py-1.5 text-sm text-white">
            Pending
            <span>
              <Archive size={18} />
            </span>
          </div>
        );
      }
      if (value === "delined") {
        return (
          <div className="accepted flex max-w-fit items-center gap-2 rounded-md bg-red-400 px-3 py-1.5 text-sm text-white">
            Declined
            <span>
              <ArchiveX size={18} />
            </span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "action",
    header: "ACTION",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div>
            <Eye size={22} strokeWidth={1.5} />
          </div>
          <DeleteRow id={row.getValue("id")} name={row.getValue("code")} />
        </div>
      );
    },
  },
];
