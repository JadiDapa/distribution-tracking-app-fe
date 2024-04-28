import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { Column } from "@tanstack/react-table";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
  header: string;
};

export default function TableSorter({ column, header }: Props) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    column.toggleSorting(column.getIsSorted() === "asc");
  }
  return (
    <Button
      variant="ghost"
      size="hug"
      onClick={handleClick}
      className="group w-full justify-start hover:bg-transparent"
    >
      {header}
      <ArrowUpDown className="ml-6 h-4 w-4 opacity-0 duration-150 group-hover:opacity-100" />
    </Button>
  );
}
