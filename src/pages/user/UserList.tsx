import DataCard from "@/components/User/DataCard";
import UserData from "@/components/User/UserData";
import { userListCard } from "@/utils/static";

export default function UserList() {
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <div className="grid grid-cols-4 gap-6">
        {userListCard.map((list) => (
          <DataCard
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
      <UserData />
    </section>
  );
}
