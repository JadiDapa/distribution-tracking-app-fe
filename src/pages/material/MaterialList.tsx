import MaterialCard from "@/components/Material/MaterialCard";
import MaterialData from "@/components/Material/MaterialData";
import { materialListCard } from "@/utils/static";

export default function MaterialList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <div className="flex gap-1 py-6 text-2xl">
        <span className="text-gray-400">Material /</span>
        <span>Product List</span>
      </div>
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
        {materialListCard.map((list) => (
          <MaterialCard
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
      <MaterialData />
    </section>
  );
}
