import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import MaterialInfoForm from "@/components/Material/MaterialInfoForm";
import MaterialStatusForm from "../../components/Material/MaterialStatusForm";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import { useState } from "react";
import MaterialImageForm from "@/components/Material/MaterialImageForm";
import useNotificationStore from "@/lib/store/NotificationStore";
import { EditMaterial, GetMaterialById } from "@/lib/network/useMaterial";
import { useNavigate, useParams } from "react-router-dom";
import DataLoading from "@/components/ui/DataLoading";

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

export default function MaterialEdit() {
  const { materialId } = useParams();
  const { material } = GetMaterialById(materialId);

  const { editMaterial, isLoading, error } = EditMaterial();

  const [picture, setPicture] = useState<File | null | undefined>(
    material?.picture,
  );
  const [pictureUrl, setPictureUrl] = useState<string | null>(
    material?.picture,
  );
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
      name: material?.name,
      categoryId: material?.categoryId.toString(),
      status: material?.status,
      sku: material?.sku,
      detail: material?.detail || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editMaterial({
        id: Number(materialId!),
        name: values.name,
        categoryId: Number(values.categoryId),
        status: values.status,
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
  if (material) {
    return (
      <section className="flex w-full flex-col gap-6 pt-6">
        <SeactionHeader section="Material" subSection="Edit Material" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CreatePageHeader
              isLoading={isLoading}
              header="Edit a Material"
              subheader="Update existing material to use accross the app"
            />
            <div className="flex gap-6">
              <div className="w-2/3">
                <MaterialInfoForm
                  control={form.control}
                  values={form.watch()}
                />
              </div>

              <div className="flex w-1/3 flex-col gap-6">
                <MaterialStatusForm
                  control={form.control}
                  values={form.watch()}
                />
                <MaterialImageForm
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
