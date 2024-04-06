import { requestColumns } from "@/utils/table/request-column";
import RequestTable from "./RequestTable";
import { GetRequests } from "@/lib/network/useRequest";

export default function requestData() {
  const { data, error } = GetRequests();

  return (
    <>
      {error && <h1>Something went wrong</h1>}
      {data && <RequestTable columns={requestColumns} data={data} />}
    </>
  );
}
