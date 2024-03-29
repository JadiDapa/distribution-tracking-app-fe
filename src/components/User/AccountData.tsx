import { useFetch } from "@/hooks/context/useFetch";
import { userColumns } from "@/utils/table/user-column";
import AccountTable from "./AccountTable";

export default function AccountData() {
  const { apiData } = useFetch("http://localhost:3000/users");

  return apiData && <AccountTable columns={userColumns} data={apiData} />;
}
