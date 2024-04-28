import DeleteToolRow from "@/components/ui/DeleteToolRow";
import TableSorter from "@/components/ui/TableSorter";
import { Tools } from "@/lib/types/tool";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Eye, Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
  },
  {
    accessorKey: "category.category",
    header: ({ column }) => <TableSorter column={column} header="TYPE" />,
    cell: (row) => <div className="capitalize">{row.getValue()}</div>,
  },
  {
    accessorKey: "expired_at",
    header: ({ column }) => <TableSorter column={column} header="EXPIRED" />,
    cell: ({ row }) => <div>{row.getValue("expired_at").slice(0, 7)}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") === "available" ? (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-green-400 px-3 py-1.5 text-sm text-white">
            Available
            <span>
              <CheckCircle size={18} />
            </span>
          </div>
        ) : (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-red-400 px-3 py-1.5 text-sm text-white">
            Unavailable
            <span>
              <XCircle size={18} />
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "ACTION",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="flex gap-2">
          <div>
            <Eye size={22} strokeWidth={1.5} />
          </div>
          <Link to={"/account-edit/" + row.getValue("id")}>
            <Pencil size={22} strokeWidth={1.5} />
          </Link>
          <DeleteToolRow id={row.getValue("id")} name={row.getValue("name")} />
        </div>
      </div>
    ),
  },
];
