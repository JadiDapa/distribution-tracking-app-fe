import { columns } from "@/utils/table/user-column";
import { DataTable } from "../ui/DataTable";
import { useFetch } from "@/hooks/context/useFetch";

function UserTable() {
  const { apiData } = useFetch("http://localhost:3000/users");

  return apiData && <DataTable columns={columns} data={apiData} />;
}

export default UserTable;
