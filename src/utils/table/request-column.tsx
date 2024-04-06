import DeleteRow from "@/components/ui/DeleteRow";
import TableSorter from "@/components/ui/TableSorter";
import { RequestType } from "@/lib/network/useRequest";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export const requestColumns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => (
      <div className="ml-4 text-primary">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <TableSorter column={column} header="REQUEST CODE" />
    ),
  },
  {
    accessorKey: "requested",
    header: ({ column }) => <TableSorter column={column} header="REQUESTED" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableSorter column={column} header="ITEM TYPE" />,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
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
          <Link to={"/account-edit/" + row.getValue("id")}>
            <Pencil size={22} strokeWidth={1.5} />
          </Link>
          <DeleteRow id={row.getValue("id")} name={row.getValue("name")} />
        </div>
      );
    },
  },
];
