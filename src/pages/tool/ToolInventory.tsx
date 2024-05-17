import ToolInventoryTable from "@/components/Tools/ToolInventoryTable";
import SeperatedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { Button } from "@/components/ui/button";
import { GetToolCategories } from "@/lib/network/useToolCategory";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import useAuthStore from "@/lib/store/AuthStore";
import { ToolInventories } from "@/lib/types/tool";
import { toolInventory } from "@/utils/table/tool-inventory";
import { Clock, PencilRuler, Wrench } from "lucide-react";
import { BsTools } from "react-icons/bs";
import { Link } from "react-router-dom";

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
      title: "Tool Quantity",
      value: tools?.reduce(
        (acc: number, tool: ToolInventories) => acc + tool.quantity,
        0,
      ),
      icon: <BsTools />,
      detail: "Total tool categories",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
    {
      title: "Tool Categories",
      value: categories?.length,
      icon: <PencilRuler />,
      detail: "Total tool categories",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (tools) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <SeactionHeader section="Tool" subSection="Tool Inventory" />
          <Link className="flex max-lg:justify-end" to="/tool-updates">
            <Button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600">
              Quantity Update History
              <Clock />
            </Button>
          </Link>
        </div>
        <div className="box-shadow flex flex-col divide-y rounded-md bg-white p-6 lg:flex-row lg:divide-x lg:divide-y-0">
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
