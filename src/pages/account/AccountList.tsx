import SeactionHeader from "@/components/ui/SeactionHeader";
import SeperatedCard from "@/components/ui/SeperatedCard";
import { GetAccounts } from "@/lib/network/useAccounts";
import { Accounts } from "@/lib/types/account";
import {
  HiBuildingOffice2,
  HiMiniBuildingOffice,
  HiMiniBuildingStorefront,
} from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import DataLoading from "@/components/ui/DataLoading";
import { accountColumns } from "@/utils/table/account-column";
import AccountTable from "@/components/User/AccountTable";

export default function AccountList() {
  const { accounts, isError, isLoading } = GetAccounts();
  const userListCard = [
    {
      title: "Total User",
      value: accounts?.length,
      icon: <BsFillPeopleFill />,
      detail: "Total every account",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Unit Pelaksana",
      value: accounts?.filter((account: Accounts) => account.unitId === 1)
        .length,
      icon: <HiBuildingOffice2 />,
      detail: "Total region account",
      bgColor: "#aff6fa",
      textColor: "#30d2d8",
    },
    {
      title: "Unit Layanan",
      value: accounts?.filter((account: Accounts) => account.unitId === 2)
        .length,
      icon: <HiMiniBuildingOffice />,
      detail: "Total every account",
      bgColor: "#ffe6d6",
      textColor: "#d37945",
    },
    {
      title: "Posko",
      value: accounts?.filter((account: Accounts) => account.unitId === 3)
        .length,
      icon: <HiMiniBuildingStorefront />,
      detail: "Total every account",
      bgColor: "#fed8ff",
      textColor: "#ff3eff",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (accounts) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        <SeactionHeader section="Account" subSection="Account List" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
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
        <AccountTable columns={accountColumns} data={accounts} />;
      </section>
    );
  }
}
