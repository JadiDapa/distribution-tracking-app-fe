import VehicleTable from "@/components/Vehicle/VehicleTable";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import SeperatedCard from "@/components/ui/SeperatedCard";
import { GetVehicles } from "@/lib/network/useVehicle";
import { GetVehicleVariants } from "@/lib/network/useVehicleVariant";
import { Vehicles } from "@/lib/types/vehicle";
import { vehicleColumns } from "@/utils/table/vehicle-column";
import { BadgeCheck, BadgeX, Bike, Car } from "lucide-react";

export default function VehicleList() {
  const { vehicles, isLoading, isError } = GetVehicles();
  const { categories } = GetVehicleVariants();
  const getVehicleYear = vehicles?.map((vehicle: Vehicles) =>
    parseInt(vehicle.manufacture_year),
  );
  const vehicleListCard = [
    {
      title: "Total Vehicles",
      value: vehicles?.length,
      icon: <Car />,
      detail: "Total every account",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Vehicle Variants",
      value: categories?.length,
      icon: <Bike />,
      detail: "Total tool categories",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
    {
      title: "Oldest Vehicle",
      value: Math.min(getVehicleYear),
      icon: <BadgeCheck />,
      detail: "Total Vehicles available",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Latest Vehicle",
      value: Math.max(getVehicleYear),
      icon: <BadgeX />,
      detail: "Total tools available",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (vehicles) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        <SeactionHeader section="Material" subSection="Vehicle List" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
          {vehicleListCard.map((list) => (
            <SeperatedCard
              key={list.title}
              title={list.title}
              value={list.value}
              detail={list.detail}
              icon={list.icon}
              bgColor={list.bgColor}
              textColor={list.textColor}
            />
          ))}
        </div>
        <VehicleTable columns={vehicleColumns} data={vehicles} />
      </section>
    );
  }
}
