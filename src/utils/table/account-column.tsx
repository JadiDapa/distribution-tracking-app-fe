import TableSorter from "@/components/ui/TableSorter";
import { Accounts } from "@/lib/types/account";
import { ColumnDef } from "@tanstack/react-table";
import {
  HiBuildingOffice2,
  HiMiniBuildingOffice,
  HiMiniBuildingStorefront,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

export const accountColumns: ColumnDef<Accounts>[] = [
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
    header: ({ column }) => <TableSorter column={column} header="ACCOUNT" />,
    cell: ({ getValue, row }) => (
      <Link
        to={`/account-detail/${row.getValue("id")}`}
        className="cursor-pointer duration-300 hover:text-primary"
      >
        {getValue() as string}
      </Link>
    ),
  },
  {
    accessorKey: "user",
    header: ({ column }) => <TableSorter column={column} header="USER" />,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <TableSorter column={column} header="UNIT" />,
    accessorFn: (row) => row.unit?.unit,
    cell: ({ getValue }) => {
      if (getValue() === "Unit Pelaksana") {
        return (
          <div className="flex  items-center gap-2 text-sm text-[#5748ff] lg:text-base">
            <HiBuildingOffice2 className="hidden text-xl lg:block" />
            Unit Pelaksana
          </div>
        );
      }
      if (getValue() === "Unit Layanan") {
        return (
          <div className="flex items-center gap-2 text-sm text-[#d37945] lg:text-base">
            <HiMiniBuildingOffice className="hidden text-xl lg:block" />
            Unit Layanan
          </div>
        );
      }
      if (getValue() === "Posko") {
        return (
          <div className="flex items-center gap-2 text-sm text-[#ff3eff] lg:text-base">
            <HiMiniBuildingStorefront className="hidden text-xl lg:block" />
            Posko
          </div>
        );
      }
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") === "active" ? (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-green-200/70 px-2 py-0.5 text-xs font-medium text-green-600 lg:px-4 lg:py-1 lg:text-sm lg:font-semibold">
            Active
          </div>
        ) : (
          <div className="flex max-w-fit items-center gap-2 rounded-md bg-red-200/70 px-2 py-0.5 text-xs font-medium text-red-600 lg:px-4 lg:py-1 lg:text-sm lg:font-semibold">
            Inactive
          </div>
        )}
      </div>
    ),
  },
];

// {
//   accessorKey: "action",
//   header: "ACTION",
//   cell: ({ row }) => {
//     return (
//       <div className="flex gap-2">
//         <div>
//           <Eye size={22} strokeWidth={1.5} />
//         </div>
//         <Link to={"/account-edit/" + row.getValue("id")}>
//           <Pencil size={22} strokeWidth={1.5} />
//         </Link>
//         <DeleteRow id={row.getValue("id")} name={row.getValue("name")} />
//       </div>
//     );
//   },
// },
