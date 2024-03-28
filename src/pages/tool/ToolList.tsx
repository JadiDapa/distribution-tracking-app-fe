import ToolData from "@/components/Tools/ToolData";
import SeperatedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { materialListCard } from "@/utils/static";

export default function ToolList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Tool" subSection="Tool List" />
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
      <ToolData />
    </section>
  );
}
