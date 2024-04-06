import RequestData from "@/components/Request/RequestData";
import ConnectedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { requestListCard } from "@/utils/static";

export default function RequestList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Request" subSection="Request List" />
      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
        {requestListCard.map((list) => (
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
      <RequestData />
    </section>
  );
}
