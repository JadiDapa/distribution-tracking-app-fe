import { useFetch } from "@/hooks/context/useFetch";
import ToolTable from "./ToolTable";
import { toolColumns } from "@/utils/table/tool-column";

export default function ToolData() {
  const { apiData } = useFetch("http://localhost:3000/tool");

  return apiData && <ToolTable columns={toolColumns} data={apiData} />;
}
