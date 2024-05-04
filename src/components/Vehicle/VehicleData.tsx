import { vehicleColumns } from "@/utils/table/vehicle-column";
import VehicleTable from "./VehicleTable";
import { GetVehicles } from "@/lib/network/useVehicle";
import BarLoader from "react-spinners/BarLoader";

export default function VehicleData() {
  const { vehicles, isLoading, isError } = GetVehicles();

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading)
    return (
      <div className="mx-auto w-full flex-col gap-8">
        <p>Loading Your Data</p>
        <BarLoader
          color={"blue"}
          loading={isLoading}
          width={400}
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return <VehicleTable columns={vehicleColumns} data={vehicles} />;
}
