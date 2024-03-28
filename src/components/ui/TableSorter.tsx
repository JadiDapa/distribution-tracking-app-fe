import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { Column } from "@tanstack/react-table";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
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
