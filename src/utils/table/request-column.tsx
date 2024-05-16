import TableSorter from "@/components/ui/TableSorter";
import { Requests } from "@/lib/types/request";
import { RequestedItems } from "@/lib/types/requestItem";
import { ColumnDef } from "@tanstack/react-table";
import { Cable, CircleDot, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export const requestColumns: ColumnDef<Requests>[] = [
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
    header: ({ column }) => (
      <TableSorter column={column} header="REQUEST CODE" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/request-detail/${row.getValue("id")}`}
        className="duration-300 hover:text-primary"
      >
        {("#" + row.getValue("code")) as string}
      </Link>
    ),
  },
  {
    accessorKey: "requested",
    header: ({ column }) => <TableSorter column={column} header="REQUESTED" />,
    accessorFn: (row) => row.requested?.name,
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableSorter column={column} header="ITEM TYPE" />,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === "material") {
        return (
          <div className="flex items-center gap-2 rounded-md font-semibold capitalize text-primary">
            <Cable size={18} />
            <span>Material</span>
          </div>
        );
      }
      if (value === "tool") {
        return (
          <div className="flex items-center gap-2 rounded-md font-semibold capitalize text-teal-500">
            <Wrench size={18} />
            <span>Tool</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => <TableSorter column={column} header="QTY" />,
    cell: ({ getValue }) => {
      const getItemsObject = getValue() as RequestedItems[];
      const getItemsQuantity = getItemsObject.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      return <div className="capitalize">{getItemsQuantity}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === "accepted") {
        return (
          <li className="flex list-disc items-center gap-2 rounded-md font-semibold capitalize text-green-500">
            <CircleDot size={12} />
            Accepted
          </li>
        );
      }
      if (value === "aggreement") {
        return (
          <li className="flex list-disc items-center gap-2 rounded-md font-semibold capitalize text-orange-500">
            <CircleDot size={12} />
            Aggreement
          </li>
        );
      }
      if (value === "pending") {
        return (
          <li className="flex list-disc items-center gap-2 rounded-md font-semibold capitalize text-yellow-500">
            <CircleDot size={12} />
            Pending
          </li>
        );
      }
      if (value === "rejected") {
        return (
          <li className="flex list-disc items-center gap-2 rounded-md font-semibold capitalize text-red-500">
            <CircleDot size={12} />
            Declined
          </li>
        );
      }
    },
  },
];
