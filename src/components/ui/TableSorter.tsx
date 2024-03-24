import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { Column } from "@tanstack/react-table";
import { Payment } from "@/utils/table/user-column";

type Props = {
  column: Column<Payment, unknown>;
  header: string;
};

export default function TableSorter({ column, header }: Props) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="group"
    >
      {header}
      <ArrowUpDown className="ml-5 h-4 w-4 opacity-0 duration-150 group-hover:opacity-100" />
    </Button>
  );
}
