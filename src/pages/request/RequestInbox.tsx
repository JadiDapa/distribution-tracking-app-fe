import RequestData from "@/components/Request/RequestData";
import ConnectedCard from "@/components/ui/ConnectedCard";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { Button } from "@/components/ui/button";
import { GetRequestInboxs } from "@/lib/network/useRequest";
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Mailbox,
  PackageOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RequestInbox() {
  const { requests, isLoading, isError } = GetRequestInboxs();
  const requestInboxCard = [
    {
      title: "Total Request",
      value: "400",
      icon: <PackageOpen />,
      detail: "Total requests sent to you",
      bgColor: "#e8e6fc",
      textColor: "#5748ff",
    },
    {
      title: "Accepted",
      value: "3",
      icon: <ArchiveRestore />,
      detail: "Requests accepted by you",
      bgColor: "#d6ffe9",
      textColor: "#45d387",
    },
    {
      title: "Pending",
      value: "7",
      icon: <Archive />,
      detail: "Requests waiting for you",
      bgColor: "#fff9d6",
      textColor: "#d3c945",
    },
    {
      title: "Declined",
      value: "7",
      icon: <ArchiveX />,
      detail: "Requests declined by you",
      bgColor: "#ffd3d5",
      textColor: "#ff5e66",
    },
  ];
  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <div>
        <div className="flex items-center justify-between">
          <SeactionHeader section="Request" subSection="Request Inbox" />
          <Link to={"/request-list"}>
            <Button className="flex items-center gap-3">
              Request List
              <span>
                <Mailbox />
              </span>
            </Button>
          </Link>
        </div>
        <div className="mt-1 text-lg text-primary">
          This are list of requests directed to you
        </div>
      </div>

      <div className="box-shadow flex divide-x rounded-md bg-white p-6">
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
      <RequestData
        requests={requests}
        isLoading={isLoading}
        isError={isError}
        isInbox
      />
    </section>
  );
}
