import ToolTable from "./ToolTable";
import { toolColumns } from "@/utils/table/tool-column";
import { GetTools } from "@/lib/network/useTool";
import BarLoader from "react-spinners/BarLoader";

export default function ToolData() {
  const { tools, isLoading, isError } = GetTools();

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading)
    return (
      <div className="mx-auto w-full flex-col gap-8">
        <p>Loading Your Data</p>
        <BarLoader
          color={"blue"}
          loading={isLoading}
          width={400}
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return <ToolTable columns={toolColumns} data={tools} />;
}
