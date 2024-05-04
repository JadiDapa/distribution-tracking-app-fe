import MoveVehicleDialog from "@/components/ui/MoveVehicleDialog";
import TableSorter from "@/components/ui/TableSorter";
import { Vehicles } from "@/lib/types/vehicle";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export const vehicleInventory: ColumnDef<Vehicles>[] = [
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
    accessorKey: "action",
    header: "ACTION",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="cursor-pointer">
          <MoveVehicleDialog
            vehicle={`${row.getValue("police_number")} (${row.getValue("brand")})`}
            id={row.getValue("id")}
          />
        </div>
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
