import ToolDetail from "@/components/Tools/ToolDetail";
import TableSorter from "@/components/ui/TableSorter";
import { Tools } from "@/lib/types/tool";
import { ColumnDef } from "@tanstack/react-table";

export const toolColumns: ColumnDef<Tools>[] = [
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
    header: ({ column }) => <TableSorter column={column} header="NAME" />,
    cell: ({ row }) => <ToolDetail id={row.getValue("id")} />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
  },
  {
    accessorKey: "category.category",
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    accessorFn: (row) => row.category?.category,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "expired_at",
    header: ({ column }) => <TableSorter column={column} header="EXPIRED" />,
    cell: ({ getValue }) => <div>{getValue().slice(0, 7)}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ getValue }) => {
      if (getValue() === "available") {
        return (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-green-200/70 px-4 py-1 text-sm font-semibold text-green-600">
            Available
          </div>
        );
      }
      if (getValue() === "unavailable") {
        return (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-red-200/70 px-4 py-1 text-sm font-semibold text-red-600">
            Unavailable
          </div>
        );
      }
    },
  },
];
