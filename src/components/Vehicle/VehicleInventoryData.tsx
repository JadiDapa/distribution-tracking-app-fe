import { vehicleInventory } from "@/utils/table/vehicle-inventory";
import VehicleInventoryTable from "./VehicleInventoryTable";
import DataLoading from "../ui/DataLoading";
import { Vehicles } from "@/lib/types/vehicle";

type Props = {
  vehicles: Vehicles[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function VehicleInventoryData({
  vehicles,
  isLoading,
  isError,
}: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <VehicleInventoryTable columns={vehicleInventory} data={vehicles} />;
}
