import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import InfoForm from "@/components/Request/InfoForm";
import RequestForm from "@/components/Request/RequestForm";
import RequestSummary from "@/components/Request/RequestSummary";
import NoteForm from "@/components/Request/NoteForm";
import useAuthStore from "@/lib/store/AuthStore";
import { useState } from "react";
import { CreateRequest } from "@/lib/network/useRequest";

const formSchema = z.object({
  requester: z.string(),
  requested: z.string(),
  note: z.string().optional(),
});

export default function RequestTool() {
  const [requestedItems, setRequestedItems] = useState([]);
  const { userData } = useAuthStore();
  const { postRequest } = CreateRequest();
  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requester: userData?.name || "",
      requested: "2",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postRequest({
      requester: userData!.id,
      requested: Number(values.requested),
      items: requestedItems,
      note: values.note,
      status: "pending",
    });
    setStatus("success");
    setMessage("Account Successfully Created!");
    navigate("/request-list");
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Request" subSection="Tool Request" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Create Request for Tools"
            subheader="Ask for restocking tools from your related instance"
          />
          <div className="flex flex-col gap-6">
            <InfoForm control={form.control} />
            <RequestForm
              requestedItems={requestedItems}
              setRequestedItems={setRequestedItems}
            />
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
