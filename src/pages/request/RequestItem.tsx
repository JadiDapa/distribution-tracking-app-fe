import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { redirect, useNavigate, useParams } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import InfoForm from "@/components/Request/InfoForm";
import RequestSummary from "@/components/Request/RequestSummary";
import NoteForm from "@/components/Request/NoteForm";
import useAuthStore from "@/lib/store/AuthStore";
import { CreateRequest } from "@/lib/network/useRequest";
import RequestForm from "@/components/Request/RequestForm";
import useRequestItemStore from "@/lib/store/RequestItemStore";

const formSchema = z.object({
  type: z.string(),
  reason: z
    .string()
    .min(5, { message: "Fill the request reason at least 5 character" }),
  requesterId: z.number(),
  requestedId: z
    .string()
    .min(1, { message: "Select account you want to request" }),
  note: z.string().optional(),
});

export default function RequestItem() {
  const { requestedItems, clearItem } = useRequestItemStore();
  const { userData } = useAuthStore();
  const { postRequest } = CreateRequest();
  const { itemType } = useParams();

  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      requestedId: "",
      note: undefined,
    },
    values: {
      requesterId: userData?.id,
      type: itemType,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postRequest({
        type: values.type,
        reason: values.reason,
        requesterId: Number(values.requesterId),
        requestedId: Number(values.requestedId),
        items: requestedItems,
        note: values.note,
        status: "pending",
      });

      setStatus("success");
      setMessage("Account Successfully Created!");
      clearItem();

      navigate("/request-list");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong!");
      console.log(error);
    }
  }

  const type = "material" || "tool" || "vehicle";
  if (itemType !== type) {
    redirect("/request-list");
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Request" subSection={`Request ${itemType}`} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header={`Create Request for ${itemType}`}
            subheader={`Ask for restocking ${itemType} from your related instance`}
          />
          <div className="flex flex-col gap-6">
            <InfoForm control={form.control} />
            <RequestForm itemType={itemType} />
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
