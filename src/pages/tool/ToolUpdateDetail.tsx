import SeactionHeader from "@/components/ui/SeactionHeader";
import { useParams } from "react-router-dom";

import DataLoading from "@/components/ui/DataLoading";
import { requestDetailColumn } from "@/utils/table/request-detail";
import { GetToolUpdateById } from "@/lib/network/useToolUpdates";
import ToolUpdateDetailTable from "@/components/Tools/ToolUpdateDetailTable";

export default function ToolUpdateDetail() {
  const { updateId } = useParams();
  const { update, isLoading, isError } = GetToolUpdateById(updateId);

  const createdAt = new Date(update?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (update) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Tool" subSection="Tool Update Detail" />
        <div className="">
          <div className="text-xl text-primary">Update #{update.code}</div>
          <header className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-medium">By {update.account.name}</h1>
              <p className="mt-1 text-gray-400">{createdAt}</p>
            </div>
          </header>
        </div>
        <div className="flex flex-col gap-6">
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="flex w-full justify-between">
              <h2 className="text-xl font-medium">Update Information</h2>
            </div>
            <div className="">
              <div className="text-lg font-medium text-primary">Reason</div>
              <div className="">{update.reason}</div>
            </div>

            {update.note && (
              <div className="">
                <div className="font-medium text-yellow-500">Note*</div>
                <div dangerouslySetInnerHTML={{ __html: update.note }} />
              </div>
            )}
          </div>
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            {update.items && (
              <ToolUpdateDetailTable
                columns={requestDetailColumn}
                data={update.items}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}
