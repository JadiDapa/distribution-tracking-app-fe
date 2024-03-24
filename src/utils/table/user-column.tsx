import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export type Payment = {
  id: string;
  account: string;
  user: string;
  category: "Unit Pelaksana" | "Unit Layanan" | "Posko";
  status: "active" | "inactive";
  action: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => (
      <div className="ml-4 text-primary">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "account",
    header: ({ column }) => <TableSorter column={column} header="ACCOUNT" />,
  },
  {
    accessorKey: "user",
    header: ({ column }) => <TableSorter column={column} header="USER" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="CATEGORY" />,
  },
  {
    accessorKey: "action",
    header: "ACTION",
    cell: () => (
      <div className="flex gap-2">
        <Link to="#">
          <Trash2 size={22} strokeWidth={1.5} />
        </Link>
        <Link to="#">
          <Pencil size={22} strokeWidth={1.5} />
        </Link>
        <Link to="#">
          <Eye size={22} strokeWidth={1.5} />
        </Link>
      </div>
    ),
  },
];
