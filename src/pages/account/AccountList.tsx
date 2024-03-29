import AccountData from "@/components/User/AccountData";
import SeactionHeader from "@/components/ui/SeactionHeader";
import SeperatedCard from "@/components/ui/SeperatedCard";
import { userListCard } from "@/utils/static";

export default function AccountList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Account" subSection="Account List" />
      <div className="grid grid-cols-4 gap-6">
        {userListCard.map((list) => (
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
      <AccountData />
    </section>
  );
}
