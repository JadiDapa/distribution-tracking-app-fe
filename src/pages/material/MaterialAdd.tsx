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
import { CreateMaterial } from "@/lib/network/useMaterial";
import { useNavigate } from "react-router-dom";

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
  detail: z.string(),
});

export default function MaterialAdd() {
  const [picture, setPicture] = useState("");
  const { setStatus, setMessage } = useNotificationStore();
  const { postMaterial, error } = CreateMaterial();

  const navigate = useNavigate();

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files[0];
    const urlPicture = URL.createObjectURL(picture);
    setPicture(urlPicture);
  }

  function removePicture() {
    setPicture("");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      status: "",
      sku: "",
      detail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postMaterial({
      name: values.name,
      categoryId: Number(values.categoryId),
      status: values.status,
      sku: values.sku,
      detail: values.detail,
    });
    if (error) {
      setStatus("error");
      setMessage("Something Wrong!");
    } else {
      setStatus("success");
      setMessage("Material Successfully Created!");
      navigate("/material-list");
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 pt-6">
      <SeactionHeader section="Material" subSection="Add Material" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Add New Material"
            subheader="Add new material to use accross the app"
          />
          <div className="flex gap-6">
            <div className="w-2/3">
              <MaterialInfoForm control={form.control} values={form.watch()} />
            </div>

            <div className="flex w-1/3 flex-col gap-6">
              <MaterialStatusForm
                control={form.control}
                values={form.watch()}
              />
              <MaterialImageForm
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
