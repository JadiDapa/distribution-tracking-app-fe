import MaterialInventoryTable from "@/components/Material/MaterialInventoryTable";
import SeperatedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { Button } from "@/components/ui/button";
import { GetMaterialCategories } from "@/lib/network/useMaterialCategory";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import useAuthStore from "@/lib/store/AuthStore";
import { MaterialInventories } from "@/lib/types/material";
import { materialInventory } from "@/utils/table/material-inventory";
import { Cable, CircuitBoard, Clock, LampCeiling } from "lucide-react";
import { Link } from "react-router-dom";

export default function MaterialInventory() {
  const { userData } = useAuthStore();
  const { materials, isLoading, isError } = GetMaterialInventories(
    userData?.id.toString(),
  );
  const { categories } = GetMaterialCategories();

  const materialInventoryCard = [
    {
      title: "Material Availlable",
      value: materials?.length,
      icon: <CircuitBoard strokeWidth={1.5} />,
      detail: "Total material available",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Material Quantity",
      value: materials?.reduce(
        (acc: number, material: MaterialInventories) => acc + material.quantity,
        0,
      ),
      icon: <Cable />,
      detail: "Total material quantities",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
    {
      title: "Material Unit",
      value: categories?.length,
      icon: <LampCeiling />,
      detail: "Total unit of material",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (materials) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <SeactionHeader section="Material" subSection="Material Inventory" />
          <Link className="flex max-lg:justify-end" to="/material-updates">
            <Button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600">
              Quantity Update History
              <Clock />
            </Button>
          </Link>
        </div>
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
        <MaterialInventoryTable columns={materialInventory} data={materials} />
      </section>
    );
  }
}
