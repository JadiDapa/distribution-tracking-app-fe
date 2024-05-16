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
import { EditVehicle, GetVehicleById } from "@/lib/network/useVehicle";
import VehicleInfoForm from "@/components/Vehicle/VehicleInfoForm";
import VehicleDateForm from "@/components/Vehicle/VehicleDateForm";
import VehicleImageForm from "@/components/Vehicle/VehicleImageForm";

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

export default function VehicleEdit() {
  const { vehicleId } = useParams();
  const { vehicle } = GetVehicleById(vehicleId);

  const { editVehicle, isLoading, error } = EditVehicle();

  const [picture, setPicture] = useState<File | null | undefined>(
    vehicle?.picture,
  );
  const [pictureUrl, setPictureUrl] = useState<string | null>(vehicle?.picture);
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
      police_number: vehicle?.police_number,
      variantId: vehicle?.variantId.toString(),
      brand: vehicle?.brand,
      contract_start: new Date(vehicle?.contract_start),
      contract_end: new Date(vehicle?.contract_end),
      areaId: vehicle?.areaId.toString(),
      locationId: vehicle?.locationId.toString(),
      detail: vehicle?.detail,
      manufacture_year: vehicle?.manufacture_year,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editVehicle({
        id: vehicle?.id,
        police_number: values.police_number,
        variantId: parseInt(values.variantId),
        brand: values.brand,
        contract_start: values.contract_start,
        contract_end: values.contract_end,
        areaId: parseInt(values.areaId),
        locationId: parseInt(values.locationId),
        detail: values.detail,
        manufacture_year: values.manufacture_year,
        picture: picture,
      });

      setStatus("success");
      setMessage("Vehicle Successfully Updated!");
      navigate("/vehicle-list");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
  }

  if (error) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (vehicle) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <SeactionHeader section="Vehicle" subSection="Edit Vehicle" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CreatePageHeader
              isLoading={isLoading}
              header="Edit a Vehicle"
              subheader="Update existing vehicle to use accross the app"
            />
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="w-full lg:w-2/3">
                <VehicleInfoForm control={form.control} values={form.watch()} />
              </div>

              <div className="flex w-full flex-col gap-6 lg:w-1/3">
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
}
