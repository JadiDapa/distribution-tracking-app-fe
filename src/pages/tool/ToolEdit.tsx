import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import { useState } from "react";
import useNotificationStore from "@/lib/store/NotificationStore";
import { useNavigate, useParams } from "react-router-dom";
import DataLoading from "@/components/ui/DataLoading";
import ToolInfoForm from "@/components/Tools/ToolInfoForm";
import ToolStatusForm from "@/components/Tools/ToolStatusForm";
import ToolImageForm from "@/components/Tools/ToolImageForm";
import { GetToolById } from "@/lib/network/useTool";
import { EditTool } from "@/lib/network/useTool";

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
  expired_at: z.any(),
  sku: z
    .string()
    .min(4, {
      message: "SKU Code must be atleast 10 characters long!",
    })
    .max(20, {
      message: "Account Name must be lower than 20 characters",
    }),
  detail: z.string().optional(),
});

export default function ToolEdit() {
  const { toolId } = useParams();
  const { tool } = GetToolById(toolId?.toString());

  const { editTool, isLoading, error } = EditTool();

  const [picture, setPicture] = useState<File | null | undefined>(
    tool?.picture,
  );
  const [pictureUrl, setPictureUrl] = useState<string | null>(tool?.picture);
  const { setStatus, setMessage } = useNotificationStore();

  const navigate = useNavigate();

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setPicture(picture);
    setPictureUrl(URL.createObjectURL(picture!));
  }

  function removePicture() {
    setPicture(null);
    setPictureUrl(null);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: tool?.name,
      categoryId: tool?.categoryId.toString(),
      status: tool?.status,
      sku: tool?.sku,
      expired_at: tool?.expired_at,
      detail: tool?.detail || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editTool({
        id: Number(toolId!),
        name: values.name,
        categoryId: Number(values.categoryId),
        status: values.status,
        expired_at: values.expired_at,
        sku: values.sku,
        detail: values.detail,
        picture: picture || "",
      });

      setStatus("success");
      setMessage("Material Successfully Updated!");
      navigate("/material-list");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
  }

  if (error) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (tool) {
    return (
      <section className="flex w-full flex-col gap-6 pt-6">
        <SeactionHeader section="Tool" subSection="Edit Tool" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CreatePageHeader
              isLoading={isLoading}
              header="Edit a Tool"
              subheader="Update existing tool to use accross the app"
            />
            <div className="flex gap-6">
              <div className="w-2/3">
                <ToolInfoForm control={form.control} values={form.watch()} />
              </div>

              <div className="flex w-1/3 flex-col gap-6">
                <ToolStatusForm control={form.control} values={form.watch()} />
                <ToolImageForm
                  handlePicture={handlePicture}
                  pictureUrl={pictureUrl}
                  removePicture={removePicture}
                />
              </div>
            </div>
          </form>
        </Form>
      </section>
    );
  }
}
