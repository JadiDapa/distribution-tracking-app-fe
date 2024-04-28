import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import ToolImageForm from "@/components/Tools/ToolImageForm";
import ToolStatusForm from "@/components/Tools/ToolStatusForm";
import ToolInfoForm from "@/components/Tools/ToolInfoForm";
import { CreateTool } from "@/lib/network/useTool";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Material Name must be atleast 5 characters long!",
    })
    .max(50, {
      message: "Account Name must be lower than 100 characters long!",
    }),
  categoryId: z.string().min(1, {
    message: "Select material category",
  }),
  status: z.string().min(1, {
    message: "Select status category",
  }),
  expired_at: z.date(),
  sku: z
    .string()
    .min(4, {
      message: "SKU Code must be atleast 10 characters long!",
    })
    .max(20, {
      message: "Account Name must be lower than 20 characters",
    }),
  detail: z.string(),
});

export default function ToolAdd() {
  const [picture, setPicture] = useState("");
  const { postTool, error } = CreateTool();
  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expired_at: new Date(),
      status: "",
      sku: "",
      detail: "",
    },
  });

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files[0];
    const urlPicture = URL.createObjectURL(picture);
    setPicture(urlPicture);
  }

  function removePicture() {
    setPicture("");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postTool({
      name: values.name,
      categoryId: Number(values.categoryId),
      status: values.status,
      expired_at: values.expired_at,
      sku: values.sku,
      detail: values.detail,
    });
    if (error) {
      setStatus("error");
      setMessage("Something Went Wrong!");
    } else {
      setStatus("success");
      setMessage("Tool Successfully Created!");
      navigate("/tool-list");
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 pt-6">
      <SeactionHeader section="Tool" subSection="Add Tool" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Add New Tool"
            subheader="Add new tool to use accross the app"
          />
          <div className="flex gap-6">
            <div className="w-2/3">
              <ToolInfoForm control={form.control} values={form.watch()} />
            </div>

            <div className="flex w-1/3 flex-col gap-6">
              <ToolStatusForm control={form.control} values={form.watch()} />
              <ToolImageForm
                handlePicture={handlePicture}
                file={picture}
                removePicture={removePicture}
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
