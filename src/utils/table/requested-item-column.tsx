import NumberInputTable from "@/components/ui/NumberInputTable";
import RemoveRequestedItem from "@/components/ui/RemoveRequestedIteem";
import TableSorter from "@/components/ui/TableSorter";
import { RequestedItems } from "@/lib/types/requestItem";
import { ColumnDef } from "@tanstack/react-table";

export const requestedItemColumns: ColumnDef<RequestedItems>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <TableSorter column={column} header="ITEM" />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <TableSorter column={column} header="STORAGE STOCK" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <TableSorter column={column} header="REQUESTED QTY" />
    ),
    cell: ({ getValue, row: { index } }) => {
      const value = getValue();
      return <NumberInputTable value={value as number} index={index} />;
    },
  },

  {
    accessorKey: "action",
    header: "REMOVE",
    cell: ({ row: { index } }) => {
      return <RemoveRequestedItem index={index} />;
    },
  },
];
