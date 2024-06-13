import SeactionHeader from "@/components/ui/SeactionHeader";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequestById, SignPdf } from "@/lib/network/useRequest";
import RequestDetailMaterials from "@/components/Request/RequestDetailMaterials";
import { requestDetailColumn } from "@/utils/table/request-detail";
import DataLoading from "@/components/ui/DataLoading";
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  Download,
  FileCheck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestPdf from "@/components/ui/RequestPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Input } from "@/components/ui/input";
import useNotificationStore from "@/lib/store/NotificationStore";

export default function RequestDetail() {
  const { requestId } = useParams();
  const { request, isError, isLoading } = GetRequestById(requestId);
  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const { signRequest } = SignPdf();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    try {
      await signRequest({
        id: request.id.toString(),
        signedPdf: file!,
        status: "pending",
      });
      setStatus("success");
      setMessage("Request Successfully Sent!");
      navigate("/request-list");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong!");
      console.log(error);
    }
  }

  const createdAt = new Date(request?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = request?.signedPdf;
    link.download = `signed-request#${request.code}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (request) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Request" subSection="Handle Request" />
        <div className="flex flex-col ">
          <div className="text-xl text-primary">Request #{request.code}</div>
          <header className="flex items-center justify-between">
            <div className="">
              <h1 className="text-2xl font-medium">
                By {request.requester.name}
              </h1>
              <p className="mt-1 text-gray-400">{createdAt}</p>
            </div>
          </header>
          <div className="mt-3 flex w-full flex-col items-start justify-between lg:flex-row lg:items-center">
            {request.status === "aggreement" && (
              <Button className="relative flex items-center gap-3">
                <Input
                  className="absolute left-0 top-0 h-full w-full opacity-0"
                  type="file"
                  onChange={handleFile}
                />
                Upload Signed PDF <Upload />
              </Button>
            )}
            <div className="relative mt-4 flex justify-end gap-6 lg:mt-0 lg:justify-start">
              {request.signedPdf ? (
                <Button
                  onClick={handleDownload}
                  variant={"muted"}
                  className="flex items-center gap-3"
                >
                  Download Signed PDF
                  <Download />
                </Button>
              ) : (
                <PDFDownloadLink
                  document={<RequestPdf request={request} />}
                  fileName={`Request #${request.code}`}
                >
                  <Button variant={"muted"} className="flex items-center gap-3">
                    Download Unsigned PDF
                    <Download />
                  </Button>
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="box-shadow flex w-full flex-col gap-5 rounded-md bg-white p-6">
            <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
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
                {request.status === "aggreement" && (
                  <div className="accepted flex max-w-fit items-center gap-2 rounded-md bg-orange-400 px-3 py-1.5 text-sm text-white">
                    Aggreement
                    <span>
                      <FileCheck size={18} />
                    </span>
                  </div>
                )}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
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
