import SeactionHeader from "@/components/ui/SeactionHeader";
import { useNavigate, useParams } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import { EditRequest, GetRequestById } from "@/lib/network/useRequest";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { ArchiveRestore, ArchiveX, Download } from "lucide-react";
import { useEffect } from "react";
import { RequestedItems } from "@/lib/types/requestItem";
import RequestFormEdit from "@/components/Request/RequestFormEdit";
import DataLoading from "@/components/ui/DataLoading";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import useAuthStore from "@/lib/store/AuthStore";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { MaterialInventories } from "@/lib/types/material";
import { ToolInventories } from "@/lib/types/tool";

export default function HandleRequest() {
  const { requestId } = useParams();
  const { userData } = useAuthStore();
  const { requestedItems, clearItem, addItem } = useRequestItemStore();
  const {
    request,
    isLoading: requestLoading,
    isError,
  } = GetRequestById(requestId!);
  const { editRequest, isLoading } = EditRequest();
  const { materials } = GetMaterialInventories(userData?.id.toString());
  const { tools } = GetToolInventories(userData?.id.toString());

  useEffect(() => {
    if (requestedItems.length < 1) {
      request?.items.forEach((item: RequestedItems) => {
        if (request?.type === "material") {
          const getStock = materials?.find(
            (request: MaterialInventories) =>
              request.material.sku === item.material!.sku,
          );
          addItem({
            id: item.id,
            materialId: item.materialId,
            quantity: item.quantity,
            requestId: item.requestId,
            name: item.material!.name,
            sku: item.material!.sku,
            stock: getStock ? getStock?.quantity : 0,
          });
        }
        if (request?.type === "tool") {
          const getStock = tools?.find(
            (request: ToolInventories) => request.tool.sku === item.tool!.sku,
          );
          addItem({
            id: item.id,
            toolId: item.toolId,
            quantity: item.quantity,
            requestId: item.requestId,
            name: item.material!.name,
            sku: item.material!.sku,
            stock: getStock ? getStock?.quantity : 0,
          });
        }
      });
    }
  });

  useEffect(() => {
    return () => {
      clearItem();
    };
  }, [clearItem]);

  const createdAt = new Date(request?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();

  async function handleReject() {
    await editRequest({
      id: request?.id,
      type: request?.type,
      reason: request?.reason,
      requestedId: request?.requestedId,
      requesterId: request?.requesterId,
      note: request?.note,
      items: requestedItems,
      status: "rejected",
    });
    setStatus("success");
    setMessage("Successfully Rejecting the request!");
    navigate("/request-inbox");
  }

  async function handleAccept() {
    await editRequest({
      id: request?.id,
      type: request?.type,
      reason: request?.reason,
      requestedId: request?.requestedId,
      requesterId: request?.requesterId,
      note: request?.note,
      items: requestedItems,
      status: "accepted",
    });
    setStatus("success");
    setMessage("Successfully accepting the request!");
    navigate("/request-inbox");
  }

  if (isError) return <div>Something went wrong...</div>;
  if (requestLoading) return <DataLoading isLoading={isLoading} />;
  if (request && tools && materials && requestedItems) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Request" subSection="Handle Request" />
        <div className="">
          <div className="text-xl text-primary">Request #{request?.code}</div>
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="">
              <h1 className="text-2xl font-medium">
                By {request?.requester.name}
              </h1>
              <p className="mt-1 text-gray-400">{createdAt}</p>
              <a href={request.signedPdf} download>
                <Button className="mt-3 flex items-center gap-3">
                  Download Signed PDF
                  <Download />
                </Button>
              </a>
            </div>
            <div className="mt-4 flex gap-4 lg:mt-0 lg:justify-normal">
              <Button
                onClick={handleAccept}
                className="bg-green-400 hover:bg-green-600"
                variant="default"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 ">
                    <ClipLoader
                      color={"white"}
                      loading={isLoading}
                      size={28}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    <span>Submitting</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    Accept <ArchiveRestore size={20} />
                  </div>
                )}
              </Button>
              <Button
                onClick={handleReject}
                className="flex items-center gap-2 bg-red-400 hover:bg-red-600"
              >
                Reject <ArchiveX size={20} />
              </Button>
            </div>
          </header>
        </div>
        <div className="flex flex-col gap-6">
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <h2 className="text-xl font-medium">Request Information</h2>
            <div className="">
              <div className="text-lg font-medium text-primary">Reason</div>
              <div className="">{request?.reason}</div>
            </div>

            {request?.note && (
              <div className="">
                <div className="font-medium text-yellow-500">Note*</div>
                <div dangerouslySetInnerHTML={{ __html: request?.note }} />
              </div>
            )}
          </div>
          <RequestFormEdit
            displayedItems={request?.type === "material" ? materials : tools}
          />
        </div>
      </section>
    );
  }
}
