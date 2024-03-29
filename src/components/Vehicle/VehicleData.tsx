import { useFetch } from "@/hooks/context/useFetch";
import { vehicleColumns } from "@/utils/table/vehicle-column";
import VehicleTable from "./VehicleTable";

export default function VehicleData() {
  const { apiData } = useFetch("http://localhost:3000/vehicle");

  return apiData && <VehicleTable columns={vehicleColumns} data={apiData} />;
}
