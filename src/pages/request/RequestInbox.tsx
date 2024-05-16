import RequestInboxTable from "@/components/Request/RequestInboxTable";
import ConnectedCard from "@/components/ui/ConnectedCard";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetRequestInboxs } from "@/lib/network/useRequest";
import useAuthStore from "@/lib/store/AuthStore";
import { Requests } from "@/lib/types/request";
import { requestInboxs } from "@/utils/table/request-inbox";
import { Archive, ArchiveRestore, ArchiveX } from "lucide-react";
import { FaTruckLoading } from "react-icons/fa";

export default function RequestInbox() {
  const { userData } = useAuthStore();
  const { requests, isLoading, isError } = GetRequestInboxs(
    userData?.id.toString(),
  );

  const requestInboxCard = [
    {
      title: "Total Request",
      value: requests?.length,
      icon: <FaTruckLoading />,
      detail: "Request sent towards you",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Accepted",
      value: requests?.filter((tool: Requests) => tool.status === "accepted")
        .length,
      icon: <ArchiveRestore />,
      detail: "Request accepted by you",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Pending",
      value: requests?.filter((tool: Requests) => tool.status === "pending")
        .length,
      icon: <Archive />,
      detail: "Pending request to handle",
      bgColor: "#fff9d6",
      textColor: "#d3c945",
    },
    {
      title: "Rejected",
      value: requests?.filter((tool: Requests) => tool.status === "rejected")
        .length,
      icon: <ArchiveX />,
      detail: "Request rejected by you",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  if (requests) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div>
          <SeactionHeader section="Request" subSection="Request Inbox" />
          <div className="mt-1 text-lg text-primary">
            This are list of requests directed to you
          </div>
        </div>
        <div className="box-shadow flex flex-col divide-y rounded-md bg-white p-6 lg:flex-row lg:divide-x lg:divide-y-0">
          {requestInboxCard.map((list) => (
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
        <RequestInboxTable
          columns={requestInboxs}
          data={requests.filter(
            (request: Requests) => request.status !== "aggreement",
          )}
        />
      </section>
    );
  }
}
