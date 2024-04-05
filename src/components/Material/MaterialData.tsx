import { useFetch } from "@/hooks/context/useFetch";
import MaterialTable from "./MaterialTable";
import { materialInventory } from "@/utils/table/material-inventory";

function UserTable() {
  // const { apiData } = useFetch("http://localhost:3000/material-inventory");

  return <MaterialTable columns={materialInventory} data={[]} />;
}

export default UserTable;
