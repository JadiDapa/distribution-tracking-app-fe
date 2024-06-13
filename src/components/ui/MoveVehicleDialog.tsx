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
import { useNavigate, useParams } from "react-router-dom";
import { MoveVehicle } from "@/lib/network/useVehicle";
import { GetAccounts } from "@/lib/network/useAccounts";
import { Accounts } from "@/lib/types/account";

type Props = {
  id: number;
  vehicle: string;
};

export default function MoveVehicleDialog({ vehicle, id }: Props) {
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const { accounts } = GetAccounts();
  const { moveVehicle } = MoveVehicle();
  const { setStatus, setMessage } = useNotificationStore();
  const { accountId } = useParams();

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      await moveVehicle({
        id: id.toString(),
        areaId: Number(area),
        locationId: Number(location),
      });
      setStatus("success");
      setMessage("Vehicle Successfully Moved!");
      navigate("/vehicle-inventory");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
  }

  if (accounts && !accountId) {
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
              <Select onValueChange={(value) => setArea(value)}>
                <SelectTrigger className="mt-3 w-full">
                  <SelectValue placeholder="Select an Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accounts
                      .filter((account: Accounts) => account.unitId !== 3)
                      .map((account: Accounts) => (
                        <SelectItem
                          key={account.id}
                          value={account.id!.toString()}
                          className="mt-1.5 text-base text-slate-600"
                        >
                          {account.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {area && (
                <Select onValueChange={(value) => setLocation(value)}>
                  <SelectTrigger className="mt-3 w-full">
                    <SelectValue placeholder="Select the new location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accounts
                        .filter((account: Accounts) => {
                          if (account.id === Number(area)) {
                            return account;
                          } else if (Number(area) !== 1) {
                            return account.higherAccountId === Number(area);
                          }
                        })
                        .map((account: Accounts) => (
                          <SelectItem
                            key={account.id}
                            value={account.id!.toString()}
                            className="mt-1.5 text-base text-slate-600"
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
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
}
