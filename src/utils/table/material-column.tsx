import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export type Material = {
  id: string;
  material: string;
  category: string;
  status: "available" | "inavailable";
  action: string;
};

export const materialColumns: ColumnDef<Material>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => (
      <div className="ml-4 text-primary">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "material",
    header: ({ column }) => <TableSorter column={column} header="MATERIAL" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="CATEGORY" />,
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
