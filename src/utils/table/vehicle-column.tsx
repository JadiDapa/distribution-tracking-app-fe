import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export type Vehicle = {
  id: number;
  police_number: string;
  variant: string;
  brand: string;
  year: string;
  location: string;
  action: string;
};

export const vehicleColumns: ColumnDef<Vehicle>[] = [
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
    accessorKey: "police_number",
    header: ({ column }) => (
      <TableSorter column={column} header="POLICE NUMBER" />
    ),
  },
  {
    accessorKey: "variant.category",
    header: ({ column }) => <TableSorter column={column} header="VARIANT" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <TableSorter column={column} header="BRAND" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "manufacture_year",
    header: ({ column }) => <TableSorter column={column} header="YEAR" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "location.name",
    header: ({ column }) => <TableSorter column={column} header="LOCATION" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
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
