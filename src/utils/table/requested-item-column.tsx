import DeleteRow from "@/components/ui/DeleteRow";
import NumberInput from "@/components/ui/NumberInput";
import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";

type RequestedItemType = {
  item: string;
  code: string;
  stock: number;
  quantity: number;
};

export const requestedItemColumns: ColumnDef<RequestedItemType>[] = [
  {
    accessorKey: "item",
    header: ({ column }) => <TableSorter column={column} header="ITEM" />,
  },
  {
    accessorKey: "code",
    header: ({ column }) => <TableSorter column={column} header="CODE" />,
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
    cell: ({ row }) => {
      return <NumberInput value={row.getValue("quantity")} />;
    },
  },
  {
    accessorKey: "action",
    header: "REMOVE",
    cell: ({ row }) => {
      return (
        <DeleteRow id={row.getValue("item")} name={row.getValue("item")} />
      );
    },
  },
];
