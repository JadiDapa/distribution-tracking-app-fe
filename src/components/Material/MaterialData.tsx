import { materialColumns } from "@/utils/table/material-column";
import { useFetch } from "@/hooks/context/useFetch";
import { DataTable } from "./MaterialTable";

function UserTable() {
  const { apiData } = useFetch("http://localhost:3000/material");

  return apiData && <DataTable columns={materialColumns} data={apiData} />;
}

export default UserTable;
