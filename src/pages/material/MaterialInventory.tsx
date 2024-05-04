import MaterialInventoryData from "@/components/Material/MaterialInventoryData";
import SeperatedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { Cable, CircuitBoard, LampCeiling } from "lucide-react";

const materialInventoryCard = [
  {
    title: "Material Availlable",
    value: "200",
    icon: <CircuitBoard strokeWidth={1.5} />,
    detail: "Total material available",
    bgColor: "#e8e6fc",
    textColor: "#5748ff",
  },
  {
    title: "Material Quantity",
    value: "400",
    icon: <Cable />,
    detail: "Total material quantity",
    bgColor: "#ffd3d5",
    textColor: "#ff5e66",
  },
  {
    title: "Material Category",
    value: "3",
    icon: <LampCeiling />,
    detail: "Total category of material",
    bgColor: "#d6ffe9",
    textColor: "#45d387",
  },
];

export default function MaterialInventory() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Material" subSection="Material Inventory" />
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
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
      <MaterialInventoryData />
    </section>
  );
}
