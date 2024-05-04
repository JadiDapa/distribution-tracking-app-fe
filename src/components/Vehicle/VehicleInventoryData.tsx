import useAuthStore from "@/lib/store/AuthStore";
import { GetVehiclesByAccountId } from "@/lib/network/useVehicle";
import { vehicleInventory } from "@/utils/table/vehicle-inventory";
import VehicleInventoryTable from "./VehicleInventoryTable";
import DataLoading from "../ui/DataLoading";

export default function VehicleInventoryData() {
  const { userData } = useAuthStore();
  const { vehicles, isLoading, isError } = GetVehiclesByAccountId(
    userData?.id.toString(),
  );

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <VehicleInventoryTable columns={vehicleInventory} data={vehicles} />;
}
