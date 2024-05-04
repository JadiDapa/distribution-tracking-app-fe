import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SeactionHeader from "@/components/ui/SeactionHeader";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import VehicleInfoForm from "@/components/Vehicle/VehicleInfoForm";
import VehicleDateForm from "@/components/Vehicle/VehicleDateForm";
import VehicleImageForm from "@/components/Vehicle/VehicleImageForm";
import { CreateVehicle } from "@/lib/network/useVehicle";
import useNotificationStore from "@/lib/store/NotificationStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  police_number: z.string(),
  variantId: z.string(),
  brand: z.string(),
  detail: z.string().optional(),
  manufacture_year: z.string(),
  contract_start: z.date(),
  contract_end: z.date(),
  areaId: z.string(),
  locationId: z.string(),
});

export default function VehicleAdd() {
  const [picture, setPicture] = useState<File | null>();
  const [pictureUrl, setPictureUrl] = useState<string | null>();
  const { setStatus, setMessage } = useNotificationStore();
  const { postVehicle, isLoading } = CreateVehicle();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      police_number: "",
      variantId: "",
      brand: "",
      areaId: "",
      locationId: "",
      detail: "",
      manufacture_year: new Date().getFullYear().toString(),
    },
  });

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setPicture(picture);
    setPictureUrl(URL.createObjectURL(picture!));
  }

  function removePicture() {
    setPicture(null);
    setPictureUrl(null);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postVehicle({
        police_number: values.police_number,
        variantId: values.variantId,
        brand: values.brand,
        detail: values.detail,
        areaId: values.areaId,
        locationId: values.locationId,
        manufacture_year: values.manufacture_year,
        contract_start: values.contract_start,
        contract_end: values.contract_end,
        picture: picture,
      });
      setStatus("success");
      setMessage("Vehicle Successfully Created!");
      navigate("/vehicle-list");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
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
            isLoading={isLoading}
            header="Add New Vehicle"
            subheader="Add new vehicle to distribute accross the app"
          />
          <div className="flex gap-6">
            <div className="w-2/3">
              <VehicleInfoForm control={form.control} values={form.watch()} />
            </div>

            <div className="flex w-1/3 flex-col gap-6">
              <VehicleDateForm control={form.control} values={form.watch()} />
              <VehicleImageForm
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
