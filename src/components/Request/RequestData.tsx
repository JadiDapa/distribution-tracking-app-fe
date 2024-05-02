import { requestColumns } from "@/utils/table/request-column";
import RequestTable from "./RequestTable";
import BarLoader from "react-spinners/BarLoader";
import { Requests } from "@/lib/types/request";
import { requestInboxs } from "@/utils/table/request-inbox";

type Props = {
  requests: Requests[];
  isLoading: boolean;
  isError: boolean;
  isInbox?: boolean;
};

export default function requestData({
  requests,
  isLoading,
  isError,
  isInbox,
}: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading)
    return (
      <div className="mx-auto w-full flex-col gap-8">
        <p>Loading Your Data</p>
        <BarLoader
          color={"blue"}
          loading={isLoading}
          width={400}
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <RequestTable
      columns={isInbox ? requestInboxs : requestColumns}
      data={requests}
    />
  );
}
