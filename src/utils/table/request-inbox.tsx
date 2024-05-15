import TableSorter from "@/components/ui/TableSorter";
import { Button } from "@/components/ui/button";
import { Requests } from "@/lib/types/request";
import { RequestedItems } from "@/lib/types/requestItem";
import { ColumnDef } from "@tanstack/react-table";
import { Cable, CheckCircle, Dot, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export const requestInboxs: ColumnDef<Requests>[] = [
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
    cell: ({ row }) => {
      if (row.getValue("status") === "accepted") {
        return (
          <Link
            to={`/request-detail/${row.getValue("id")}`}
            className="duration-300 hover:text-primary"
          >
            {row.getValue("code") as string}
          </Link>
        );
      } else {
        return (
          <Link
            to={`/request-inbox/${row.getValue("id")}`}
            className="duration-300 hover:text-primary"
          >
            {row.getValue("code") as string}
          </Link>
        );
      }
    },
  },
  {
    accessorKey: "requester",
    header: ({ column }) => <TableSorter column={column} header="REQUESTER" />,
    accessorFn: (row) => row.requester?.name,
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
          <li className="flex -translate-x-4 list-disc items-center rounded-md font-semibold capitalize text-green-500">
            <Dot size={40} />
            Accepted
          </li>
        );
      }
      if (value === "pending") {
        return (
          <li className="flex -translate-x-4 list-disc items-center rounded-md font-semibold capitalize text-yellow-500">
            <Dot size={40} />
            Pending
          </li>
        );
      }
      if (value === "rejected") {
        return (
          <li className="flex -translate-x-4 list-disc items-center rounded-md font-semibold capitalize text-green-500">
            <Dot size={40} />
            Finished
          </li>
        );
      }
    },
  },
  {
    accessorKey: "HANDLE",
    header: "ACTION",
    cell: ({ row }) => {
      if (row.getValue("status") === "accepted") {
        return (
          <Button className="cursor-default bg-green-500 px-3 py-0 text-white hover:bg-green-500">
            <CheckCircle size={20} />
          </Button>
        );
      } else {
        return (
          <Link
            to={`/request-inbox/${row.getValue("id")}`}
            className="flex gap-2 rounded-full bg-primary px-3 py-0.5 text-white duration-300 hover:opacity-80"
          >
            HANDLE
          </Link>
        );
      }
    },
  },
];
