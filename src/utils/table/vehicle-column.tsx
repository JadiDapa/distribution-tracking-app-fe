import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export type Vehicle = {
  id: number;
  "police-number": string;
  variant: string;
  brand: string;
  year: string;
  location: string;
  action: string;
};

export const vehicleColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableSorter column={column} header="#" />,
    cell: ({ row }) => (
      <div className="ml-4 text-primary">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "police-number",
    header: ({ column }) => (
      <TableSorter column={column} header="POLICE NUMBER" />
    ),
  },
  {
    accessorKey: "variant",
    header: ({ column }) => <TableSorter column={column} header="VARIANT" />,
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
  },
  {
    accessorKey: "year",
    header: ({ column }) => <TableSorter column={column} header="YEAR" />,
  },
  {
    accessorKey: "location",
    header: ({ column }) => <TableSorter column={column} header="LOCATION" />,
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
