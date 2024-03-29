import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import VehicleInfoForm from "@/components/Vehicle/VehicleInfoForm";
import VehicleDateForm from "@/components/Vehicle/VehicleDateForm";
import VehicleImageForm from "@/components/Vehicle/VehicleImageForm";

const formSchema = z.object({
  police_number: z.string(),
  variant: z.string(),
  brand: z.string(),
  color: z.string(),
  cc: z.string(),
  fuel: z.string(),
  year: z.string(),
  detail: z.string(),
  contract_start: z.date(),
  contract_end: z.date(),
  area: z.string(),
  location: z.string(),
  image: z.string(),
});

export type VehicleType = {
  police_number: string;
  variant: string;
  brand: string;
  color: string;
  cc: string;
  fuel: string;
  year: string;
  detail: string;
  contract_start: Date;
  contract_end: Date;
  area: string;
  location: string;
  image: string;
};

export default function VehicleAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      police_number: "",
      variant: "",
      brand: "",
      color: "",
      cc: "",
      fuel: "",
      year: "",
      detail: "",
      contract_start: new Date(),
      contract_end: new Date(),
      area: "",
      location: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex w-full flex-col gap-6 pt-6">
      <SeactionHeader section="Vehicle" subSection="Add Vehicle" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Add New Vehicle"
            subheader="Add new vehicle to distribute accross the app"
          />
          <div className="flex gap-6">
            <div className="w-2/3">
              <VehicleInfoForm control={form.control} values={form.watch()} />
            </div>

            <div className="flex w-1/3 flex-col gap-6">
              <VehicleDateForm control={form.control} values={form.watch()} />
              <VehicleImageForm control={form.control} values={form.watch()} />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
