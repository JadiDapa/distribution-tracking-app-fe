import TableSorter from "@/components/ui/TableSorter";
import { RequestedItems } from "@/lib/types/requestItem";
import { ColumnDef } from "@tanstack/react-table";

export const requestDetailColumn: ColumnDef<RequestedItems>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableSorter column={column} header="MATERIAL NAME" />
    ),
    accessorFn: (row) =>
      row.material?.name ? row.material?.name : row.tool?.name,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
    accessorFn: (row) =>
      row.material?.sku ? row.material?.sku : row.tool?.sku,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TableSorter column={column} header="QUANTITY" />,
    cell: ({ getValue }) => <div className="ps-7">{getValue() as string}</div>,
  },
];
