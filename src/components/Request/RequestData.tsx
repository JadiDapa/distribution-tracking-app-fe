import RequestTable from "./RequestTable";
import { Requests } from "@/lib/types/request";
import { requestInboxs } from "@/utils/table/request-inbox";
import DataLoading from "../ui/DataLoading";

type Props = {
  requests: Requests[];
  isLoading: boolean;
  isError: boolean;
  isInbox?: boolean;
};

export default function requestData({ requests, isLoading, isError }: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <RequestTable columns={requestInboxs} data={requests} />;
}
