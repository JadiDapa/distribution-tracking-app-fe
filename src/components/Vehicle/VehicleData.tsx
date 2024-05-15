import { vehicleColumns } from "@/utils/table/vehicle-column";
import VehicleTable from "./VehicleTable";
import { Vehicles } from "@/lib/types/vehicle";
import DataLoading from "../ui/DataLoading";

type Props = {
  vehicles: Vehicles[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function VehicleData({ vehicles, isLoading, isError }: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <VehicleTable columns={vehicleColumns} data={vehicles} />;
}
