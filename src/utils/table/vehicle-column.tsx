import VehicleDetail from "@/components/Vehicle/VehicleDetail";
import TableSorter from "@/components/ui/TableSorter";
import { Vehicles } from "@/lib/types/vehicle";
import { ColumnDef } from "@tanstack/react-table";

export const vehicleColumns: ColumnDef<Vehicles>[] = [
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
    accessorKey: "variant",
    header: ({ column }) => <TableSorter column={column} header="VARIANT" />,
    accessorFn: (row) => row.variant?.category,
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
];
