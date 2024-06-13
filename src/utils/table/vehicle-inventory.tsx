import VehicleDetail from "@/components/Vehicle/VehicleDetail";
import MoveVehicleDialog from "@/components/ui/MoveVehicleDialog";
import TableSorter from "@/components/ui/TableSorter";
import { Vehicles } from "@/lib/types/vehicle";

import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => <VehicleDetail id={row.getValue("id")} />,
  },
  {
    accessorKey: "variant.category",
    header: ({ column }) => <TableSorter column={column} header="VARIANT" />,
    cell: ({ getValue }) => (
      <div className="text-sm capitalize lg:text-base">
        {getValue() as string}
      </div>
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
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div className="cursor-pointer">
            <MoveVehicleDialog
              vehicle={`${row.getValue("police_number")} (${row.getValue("brand")})`}
              id={row.getValue("id")}
            />
          </div>
        </div>
      );
    },
  },
];
