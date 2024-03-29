import VehicleData from "@/components/Vehicle/VehicleData";
import ConnectedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { materialListCard } from "@/utils/static";

export default function VehicleList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Vehicle" subSection="Vehicle List" />
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
        {materialListCard.map((list) => (
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
      <VehicleData />
    </section>
  );
}
