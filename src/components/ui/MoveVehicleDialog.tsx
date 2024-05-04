import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useState } from "react";
import useNotificationStore from "@/lib/store/NotificationStore";
import { useNavigate } from "react-router-dom";
import { MoveVehicle } from "@/lib/network/useVehicle";
import { GetAccounts } from "@/lib/network/useAccounts";
import { Accounts } from "@/lib/types/account";

type Props = {
  id: number;
  vehicle: string;
};

export default function MoveVehicleDialog({ vehicle, id }: Props) {
  const [newLocation, setNewLocation] = useState("");
  const { accounts } = GetAccounts();
  const { moveVehicle } = MoveVehicle();
  const { setStatus, setMessage } = useNotificationStore();

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      await moveVehicle({
        id: id.toString(),
        locationId: newLocation,
      });

      setStatus("success");
      setMessage("Material Successfully Created!");
      navigate("/vehicle-inventory");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Truck size={24} strokeWidth={1.5} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Move <span className="font-semibold text-primary">{vehicle}</span>{" "}
            Into Other Location?
          </AlertDialogTitle>
          <div className="mt-5 flex flex-col gap-2">
            <div className="text-sm text-gray-400">
              This vehicle will moved from your location into selected one!
            </div>

            <Select onValueChange={(value) => setNewLocation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a new location" />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  ?.filter((account: Accounts) => Number(account.unitId) < 10)
                  ?.map((account: Accounts) => (
                    <SelectItem
                      key={account.id}
                      value={account.id!.toString()}
                      className="mt-1.5 text-base text-slate-600"
                    >
                      {account.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleSubmit}
            className="flex gap-2 bg-primary hover:opacity-95"
          >
            Submit
          </AlertDialogAction>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
