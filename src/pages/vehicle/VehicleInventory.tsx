import VehicleInventoryTable from "@/components/Vehicle/VehicleInventoryTable";
import SeperatedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetVehiclesByAccountId } from "@/lib/network/useVehicle";
import { GetVehicleVariants } from "@/lib/network/useVehicleVariant";
import useAuthStore from "@/lib/store/AuthStore";
import { Vehicles } from "@/lib/types/vehicle";
import { vehicleInventory } from "@/utils/table/vehicle-inventory";
import { BadgeCheck, BadgeX, Bike, CarFront } from "lucide-react";

export default function VehicleInventory() {
  const { userData } = useAuthStore();
  const { vehicles, isLoading, isError } = GetVehiclesByAccountId(
    userData?.id.toString(),
  );

  const { categories } = GetVehicleVariants();
  const getVehicleYear = vehicles?.map((vehicle: Vehicles) =>
    parseInt(vehicle.manufacture_year),
  );

  const materialInventoryCard = [
    {
      title: "Tota Vehicles",
      value: vehicles?.length,
      icon: <CarFront strokeWidth={1.5} />,
      detail: "Total material available",
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
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Vehicle" subSection="Vehicle Inventory" />
        <div className="box-shadow flex flex-col divide-y rounded-md bg-white p-6 lg:flex-row lg:divide-x lg:divide-y-0">
          {materialInventoryCard.map((list) => (
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
        <VehicleInventoryTable columns={vehicleInventory} data={vehicles} />
      </section>
    );
  }
}
