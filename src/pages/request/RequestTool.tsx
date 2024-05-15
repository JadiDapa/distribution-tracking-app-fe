import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import InfoForm from "@/components/Request/InfoForm";
import RequestSummary from "@/components/Request/RequestSummary";
import NoteForm from "@/components/Request/NoteForm";
import useAuthStore from "@/lib/store/AuthStore";
import { CreateRequest } from "@/lib/network/useRequest";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import SelectTool from "@/components/Request/SelectTool";

const formSchema = z.object({
  reason: z.string(),
  requestedId: z.string(),
  note: z.string().optional(),
});

export default function RequestTool() {
  const { requestedItems, clearItem } = useRequestItemStore();
  const { userData } = useAuthStore();
  const { postRequest } = CreateRequest();

  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      requestedId: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postRequest({
        type: "tool",
        reason: values.reason,
        requesterId: Number(userData?.id),
        requestedId: Number(values.requestedId),
        items: requestedItems,
        note: values.note,
        status: "pending",
      });

      setStatus("success");
      setMessage("Request Successfully Sent!");
      clearItem();
      navigate("/tool-inventory");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong!");
      console.log(error);
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Request" subSection={`Request Tool`} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header={`Create Request for Tool`}
            subheader={`Ask for restocking Tool from your related instance`}
          />
          <div className="flex flex-col gap-6">
            <InfoForm control={form.control} />
            <SelectTool />
            <div className="flex gap-6">
              <NoteForm control={form.control} />
              <RequestSummary
                values={form.watch()}
                requestedItems={requestedItems}
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
