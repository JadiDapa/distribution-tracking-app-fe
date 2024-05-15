import VehicleData from "@/components/Vehicle/VehicleData";
import ConnectedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetVehicles } from "@/lib/network/useVehicle";
import { GetVehicleVariants } from "@/lib/network/useVehicleVariant";
import { Vehicles } from "@/lib/types/vehicle";
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
      title: "Tool Categories",
      value: categories?.length,
      icon: <Bike />,
      detail: "Total tool categories",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
    {
      title: "Available Tools",
      value: Math.min(getVehicleYear),
      icon: <BadgeCheck />,
      detail: "Total Vehicles available",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Unavailable Tools",
      value: Math.max(getVehicleYear),
      icon: <BadgeX />,
      detail: "Total tools available",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Vehicle" subSection="Vehicle List" />
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
        {vehicleListCard.map((list) => (
          <ConnectedCard
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
      <VehicleData
        vehicles={vehicles}
        isError={isError}
        isLoading={isLoading}
      />
    </section>
  );
}
