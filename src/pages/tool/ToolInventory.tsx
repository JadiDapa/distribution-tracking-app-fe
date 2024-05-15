import ToolInventoryTable from "@/components/Tools/ToolInventoryTable";
import SeperatedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetToolCategories } from "@/lib/network/useToolCategory";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import useAuthStore from "@/lib/store/AuthStore";
import { Tools } from "@/lib/types/tool";
import { toolInventory } from "@/utils/table/tool-inventory";
import { BadgeCheck, BadgeX, PencilRuler, Wrench } from "lucide-react";

export default function ToolInventory() {
  const { userData } = useAuthStore();
  const { tools, isLoading, isError } = GetToolInventories(
    userData?.id.toString(),
  );
  const { categories } = GetToolCategories();

  const toolInventoryCard = [
    {
      title: "Total Tools",
      value: tools?.length,
      icon: <Wrench />,
      detail: "Total every account",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Tool Categories",
      value: categories?.length,
      icon: <PencilRuler />,
      detail: "Total tool categories",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
    {
      title: "Available Tools",
      value: tools?.filter((tool: Tools) => tool.status === "available").length,
      icon: <BadgeCheck />,
      detail: "Total tools available",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Unavailable Tools",
      value: tools?.filter((tool: Tools) => tool.status === "unavailable")
        .length,
      icon: <BadgeX />,
      detail: "Total tools available",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (tools) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Tool" subSection="Tool Inventory" />
        <div className="box-shadow flex divide-x rounded-md bg-white p-6">
          {toolInventoryCard.map((list) => (
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
        <ToolInventoryTable columns={toolInventory} data={tools} />
      </section>
    );
  }
}
