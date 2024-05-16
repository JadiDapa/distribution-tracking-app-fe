import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";

export type Tool = {
  id: number;
  tool: {
    name: string;
    sku: string;
    category: {
      category: string;
    };
    expired_at: string;
  };
  category: string;
  quantity: number;
  action: string;
};

export const toolInventory: ColumnDef<Tool>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <TableSorter column={column} header="TOOL" />,
    accessorFn: (row) => row.tool?.name,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
    accessorFn: (row) => row.tool?.sku,
    cell: ({ getValue }) => (
      <div className="text-xs capitalize lg:text-base">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="CATEGORY" />,
    accessorFn: (row) => row.tool?.category.category,
    cell: ({ getValue }) => (
      <div className="capitalize ">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "expired_at",
    header: ({ column }) => <TableSorter column={column} header="EXPIRED" />,
    accessorFn: (row) => row.tool?.expired_at,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TableSorter column={column} header="QUANTITY" />,
  },
  {
    accessorKey: "toolId",
    header: () => <></>,
    cell: () => <></>,
  },
];
