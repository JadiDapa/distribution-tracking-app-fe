import RequestData from "@/components/Request/RequestData";
import ConnectedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { Button } from "@/components/ui/button";
import { GetRequestByAccountId } from "@/lib/network/useRequest";
import useAuthStore from "@/lib/store/AuthStore";
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Mailbox,
  PackageOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RequestList() {
  const { userData } = useAuthStore();
  const { requests, isLoading, isError } = GetRequestByAccountId(
    userData!.id.toString(),
  );
  const requestListCard = [
    {
      title: "Total Request",
      value: "400",
      icon: <PackageOpen />,
      detail: "Total of request you accept",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Accepted",
      value: "3",
      icon: <ArchiveRestore />,
      detail: "Total of accepted request",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Pending",
      value: "7",
      icon: <Archive />,
      detail: "Total of pending request",
      bgColor: "#fff9d6",
      textColor: "#d3c945",
    },
    {
      title: "Declined",
      value: "7",
      icon: <ArchiveX />,
      detail: "Total of declined request",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <div>
        <div className="flex items-center justify-between">
          <SeactionHeader section="Request" subSection="Request List" />
          <Link to={"/request-inbox"}>
            <Button className="flex items-center gap-3">
              Request Inbox
              <span>
                <Mailbox />
              </span>
            </Button>
          </Link>
        </div>
        <div className="mt-1 text-lg text-primary">
          This is your request list
        </div>
      </div>

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
      <RequestData
        requests={requests}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
}
