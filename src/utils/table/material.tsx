import MaterialDetail from "@/components/Material/MaterialDetail";
import TableSorter from "@/components/ui/TableSorter";
import { Materials } from "@/lib/types/material";
import { ColumnDef } from "@tanstack/react-table";

export const material: ColumnDef<Materials>[] = [
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
    header: ({ column }) => <TableSorter column={column} header="MATERIAL" />,
    cell: ({ row }) => <MaterialDetail id={row.getValue("id")} />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableSorter column={column} header="SKU" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <TableSorter column={column} header="UNIT" />,
    accessorFn: (row) => row.category?.category,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
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

// {
//   accessorKey: "action",
//   header: "ACTION",
//   cell: ({ row }) => (
//     <div className="flex gap-2">
//       <div className="flex gap-2">
//         <div>
//           <Eye size={22} strokeWidth={1.5} />
//         </div>
//         <Link to={"/account-edit/" + row.getValue("id")}>
//           <Pencil size={22} strokeWidth={1.5} />
//         </Link>
//         <DeleteMaterialRow
//           id={row.getValue("id")}
//           name={row.getValue("name")}
//         />
//       </div>
//     </div>
//   ),
// },
