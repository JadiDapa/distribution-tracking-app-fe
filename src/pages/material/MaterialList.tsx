import MaterialTable from "@/components/Material/MaterialTable";
import SeperatedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetMaterials } from "@/lib/network/useMaterial";
import { GetMaterialCategories } from "@/lib/network/useMaterialCategory";
import { Materials } from "@/lib/types/material";
import { material } from "@/utils/table/material";
import { BadgeCheck, BadgeX, Cable, Ruler } from "lucide-react";

export default function MaterialList() {
  const { materials, isError, isLoading } = GetMaterials();
  const { categories } = GetMaterialCategories();
  const materialListCard = [
    {
      title: "Total Material",
      value: materials?.length,
      icon: <Cable />,
      detail: "Total every account",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Material Unit",
      value: categories?.length,
      icon: <Ruler />,
      detail: "Total material units",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
    {
      title: "Available Material",
      value: materials?.filter(
        (material: Materials) => material.status === "available",
      ).length,
      icon: <BadgeCheck />,
      detail: "Total material available",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Unavailable Material",
      value: materials?.filter(
        (material: Materials) => material.status === "unavailable",
      ).length,
      icon: <BadgeX />,
      detail: "Total account available",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (materials) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Material" subSection="Material List" />
        <div className="box-shadow flex divide-x rounded-md bg-white p-6">
          {materialListCard.map((list) => (
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
        <MaterialTable columns={material} data={materials} />;
      </section>
    );
  }
}
