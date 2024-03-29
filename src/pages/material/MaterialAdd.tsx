import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import MaterialInfoForm from "@/components/Material/MaterialInfoForm";
import MaterialImageForm from "@/components/Material/MaterialImageForm";
import MaterialStatusForm from "../../components/Material/MaterialStatusForm";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";

const formSchema = z.object({
  name: z.string().min(8).max(100),
  category: z.string().min(8).max(50),
  status: z.string().min(8).max(50),
  sku: z.string().min(8).max(50),
  description: z.string().min(8),
  image: z.string().min(8),
});

export default function MaterialAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      status: "",
      sku: "",
      description: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              <MaterialImageForm control={form.control} values={form.watch()} />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
