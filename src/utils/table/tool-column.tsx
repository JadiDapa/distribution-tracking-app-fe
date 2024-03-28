import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export type Tool = {
  id: number;
  tool: string;
  category: string;
  expired: string;
  status: "active" | "inactive";
  action: string;
};

export const toolColumns: ColumnDef<Tool>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => (
      <div className="ml-4 text-primary">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "tool",
    header: ({ column }) => <TableSorter column={column} header="TOOL" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="CATEGORY" />,
  },
  {
    accessorKey: "expired",
    header: ({ column }) => <TableSorter column={column} header="EXPIRED" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
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
