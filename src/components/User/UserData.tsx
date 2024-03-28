import { useFetch } from "@/hooks/context/useFetch";
import UserTable from "./UserTable";
import { userColumns } from "@/utils/table/user-column";

export default function ToolData() {
  const { apiData } = useFetch("http://localhost:3000/users");

  return apiData && <UserTable columns={userColumns} data={apiData} />;
}
