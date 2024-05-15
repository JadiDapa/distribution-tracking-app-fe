import ToolData from "@/components/Tools/ToolData";
import SeperatedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetTools } from "@/lib/network/useTool";
import { GetToolCategories } from "@/lib/network/useToolCategory";
import { Tools } from "@/lib/types/tool";
import { BadgeCheck, BadgeX, PencilRuler, Wrench } from "lucide-react";

export default function ToolList() {
  const { tools, isError, isLoading } = GetTools();
  const { categories } = GetToolCategories();
  const toolListCard = [
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
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Tool" subSection="Tool List" />
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
        {toolListCard.map((list) => (
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
      <ToolData tools={tools} isError={isError} isLoading={isLoading} />
    </section>
  );
}
