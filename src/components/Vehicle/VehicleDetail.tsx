import { CarFront, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Link } from "react-router-dom";
import DeleteMaterialRow from "../ui/DeleteMaterialRow";
import { GetVehicleById } from "@/lib/network/useVehicle";

type Props = {
  id: string;
};

export default function VehicleDetail({ id }: Props) {
  const { vehicle } = GetVehicleById(id);
  console.log(vehicle);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer duration-300 hover:text-primary ">
        {vehicle?.police_number}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Vehicle Detail
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-md border-2">
                {vehicle?.picture ? (
                  <img className="w-full" src={vehicle?.picture} alt="" />
                ) : (
                  <CarFront size={80} />
                )}
              </div>
            </div>
            <div className="flex w-auto justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium text-primary">
                  {vehicle?.police_number}
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold">Brand:</span>
                  {vehicle?.brand}
                </div>
                <div className="flex gap-3 capitalize">
                  <span className="font-semibold">Category:</span>
                  {vehicle?.variant.category}
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold">Manufacture Year:</span>
                  {vehicle?.manufacture_year}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <div className="flex w-full justify-between">
              <div className="flex gap-3">
                <span className="font-semibold">Area:</span>
                {vehicle?.area.name}
              </div>
              <div className="flex gap-3 capitalize">
                <span className="font-semibold">Location:</span>
                {vehicle?.location.name}
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div className="flex gap-3">
                <span className="font-semibold">Start:</span>
                {vehicle?.contract_start.slice(0, 10)}
              </div>
              <div className="flex gap-3 capitalize">
                <span className="font-semibold">End:</span>
                {vehicle?.contract_end.slice(0, 10)}
              </div>
            </div>
          </div>
          {vehicle?.detail && (
            <div className="mt-6 flex flex-col gap-4">
              <div className="text-sm font-semibold text-slate-400">DETAIL</div>

              <div
                className="no-tailwind-base"
                dangerouslySetInnerHTML={{ __html: vehicle?.detail }}
              />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Link
            to={"/vehicle-edit/" + vehicle?.id}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-0.5 text-white"
          >
            <Pencil size={16} />
            Edit
          </Link>

          <DeleteMaterialRow id={vehicle?.id} name={vehicle?.name} />

          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
