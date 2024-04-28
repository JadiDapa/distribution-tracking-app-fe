import DeleteRow from "@/components/ui/DeleteRow";
import TableSorter from "@/components/ui/TableSorter";
import { Accounts } from "@/lib/types/account";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export const accountColumns: ColumnDef<Accounts>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => <div className="ml-4 text-primary">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableSorter column={column} header="ACCOUNT" />,
  },
  {
    accessorKey: "user",
    header: ({ column }) => <TableSorter column={column} header="USER" />,
  },
  {
    accessorKey: "unit.unit",
    header: ({ column }) => <TableSorter column={column} header="UNIT" />,
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
