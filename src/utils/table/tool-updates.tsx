import TableSorter from "@/components/ui/TableSorter";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type ToolUpdates = {
  id: number;
  tool: {
    name: string;
    sku: string;
    category: {
      category: string;
    };
  };
  category: string;
  quantity: number;
  action: string;
};

export const toolUpdates: ColumnDef<ToolUpdates>[] = [
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
    accessorKey: "code",
    header: ({ column }) => <TableSorter column={column} header="CODE" />,
    cell: ({ row }) => (
      <Link
        to={`/tool-update/${row.getValue("id")}`}
        className="duration-300 hover:text-primary"
      >
        {row.getValue("code") as string}
      </Link>
    ),
  },
  {
    accessorKey: "reason",
    header: ({ column }) => <TableSorter column={column} header="REASON" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <TableSorter column={column} header="DATE" />,
    cell: ({ getValue }) => (
      <div className="capitalize">{(getValue() as string).slice(0, 10)}</div>
    ),
  },
];
