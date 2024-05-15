import SeactionHeader from "@/components/ui/SeactionHeader";
import { useParams } from "react-router-dom";
import { GetRequestById } from "@/lib/network/useRequest";
import RequestDetailMaterials from "@/components/Request/RequestDetailMaterials";
import { requestDetailColumn } from "@/utils/table/request-detail";
import DataLoading from "@/components/ui/DataLoading";
import { Archive, ArchiveRestore, ArchiveX } from "lucide-react";

export default function RequestDetail() {
  const { requestId } = useParams();
  const { request, isError, isLoading } = GetRequestById(requestId);

  console.log(request);

  const createdAt = new Date(request?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (request) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Request" subSection="Handle Request" />
        <div className="">
          <div className="text-xl text-primary">Request #{request.code}</div>
          <header className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-medium">
                By {request.requester.name}
              </h1>
              <p className="mt-1 text-gray-400">{createdAt}</p>
            </div>
          </header>
        </div>
        <div className="flex flex-col gap-6">
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="flex w-full justify-between">
              <h2 className="text-xl font-medium">Request Information</h2>
              <h2 className="text-xl font-medium">
                {request.status === "accepted" && (
                  <div className="flex max-w-fit items-center gap-2 rounded-md bg-green-400 px-3 py-1.5 text-sm capitalize text-white">
                    Accepted
                    <span>
                      <ArchiveRestore size={18} />
                    </span>
                  </div>
                )}
                {request.status === "pending" && (
                  <div className="accepted flex max-w-fit items-center gap-2 rounded-md bg-yellow-500 px-3 py-1.5 text-sm text-white">
                    Pending
                    <span>
                      <Archive size={18} />
                    </span>
                  </div>
                )}
                {request.status === "rejected" && (
                  <div className="accepted flex max-w-fit items-center gap-2 rounded-md bg-red-400 px-3 py-1.5 text-sm text-white">
                    Declined
                    <span>
                      <ArchiveX size={18} />
                    </span>
                  </div>
                )}
              </h2>
            </div>
            <div className="">
              <div className="text-lg font-medium text-primary">Reason</div>
              <div className="">{request.reason}</div>
            </div>

            {request.note && (
              <div className="">
                <div className="font-medium text-yellow-500">Note*</div>
                <div dangerouslySetInnerHTML={{ __html: request.note }} />
              </div>
            )}
          </div>
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            {request.items && (
              <RequestDetailMaterials
                columns={requestDetailColumn}
                data={request.items}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}
