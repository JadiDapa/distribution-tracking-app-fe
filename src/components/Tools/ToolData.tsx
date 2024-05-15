import ToolTable from "./ToolTable";
import { toolColumns } from "@/utils/table/tool-column";
import { Tools } from "@/lib/types/tool";
import DataLoading from "../ui/DataLoading";

type Props = {
  tools: Tools[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function ToolData({ tools, isLoading, isError }: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <ToolTable columns={toolColumns} data={tools} />;
}
