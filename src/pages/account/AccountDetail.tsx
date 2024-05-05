import { useState } from "react";
import SeactionHeader from "@/components/ui/SeactionHeader";
import DeleteRow from "@/components/ui/DeleteRow";
import DataLoading from "@/components/ui/DataLoading";
import MaterialInventoryData from "@/components/Material/MaterialInventoryData";
import ToolInventory from "../tool/ToolInventory";
import VehicleInventoryData from "@/components/Vehicle/VehicleInventoryData";
import RequestData from "@/components/Request/RequestData";
import { GetAccountById } from "@/lib/network/useAccounts";
import { Cable, CarFront, Pencil, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  HiBuildingOffice2,
  HiMiniBuildingOffice,
  HiMiniBuildingStorefront,
} from "react-icons/hi2";
import { Accounts } from "@/lib/types/account";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import { GetVehiclesByAccountId } from "@/lib/network/useVehicle";
import { GetRequestByAccountId } from "@/lib/network/useRequest";

export default function AccountDetail() {
  const { accountId } = useParams();

  const {
    materials,
    isLoading: materialLoading,
    isError: materialError,
  } = GetMaterialInventories(accountId);
  const {
    vehicles,
    isLoading: vehicleLoading,
    isError: vehicleError,
  } = GetVehiclesByAccountId(accountId);
  const {
    requests,
    isLoading: requestLoading,
    isError: requestError,
  } = GetRequestByAccountId(accountId);

  const { account, isLoading, isError } = GetAccountById(accountId!);
  const [displayedData, setDisplayedData] = useState<
    "materials" | "tools" | "vehicles" | "requests"
  >("materials");

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Account" subSection="Account Detail" />
      <div className="flex w-full gap-6">
        <div className="box-shadow flex w-[70%] gap-6 rounded-md bg-white p-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-28 overflow-hidden rounded-md border-[3px]">
              <img
                className="w-full"
                src={
                  account?.picture ||
                  "https://res.cloudinary.com/dxxgiqzhc/image/upload/v1714885198/images_awiko3.png"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl text-primary">{account?.name}</div>
              <div className="text-slate-500">{account?.user}</div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to={"/account-edit/" + account?.id}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-white"
              >
                <Pencil size={16} />
                Edit
              </Link>
              <DeleteRow id={account?.id} name={account?.name} />
            </div>
          </div>
          <div className="h-auto w-[1px] bg-slate-300"></div>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-slate-400">DETAIL</div>
            <div className="flex flex-col gap-2 text-slate-500">
              <div className="flex gap-4">
                <span className="font-medium">Account:</span>{" "}
                <span className="text-primary">{account?.name}</span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium">User:</span> {account?.user}
              </div>
              <div className="flex gap-4">
                <span className="font-medium">Unit:</span>{" "}
                <span
                  className={`flex items-center gap-2 ${account?.unit.unit === "Unit Pelaksana" && "text-[#5748ff]"} ${account?.unit.unit === "Unit Layanan" && "text-[#d37945]"} ${account?.unit.unit === "Posko" && "text-[#ff3eff]"}`}
                >
                  {account?.unit.unit === "Unit Pelaksana" && (
                    <HiBuildingOffice2 className="text-lg" />
                  )}
                  {account?.unit.unit === "Unit Layanan" && (
                    <HiMiniBuildingOffice className="text-lg" />
                  )}
                  {account?.unit.unit === "Posko" && (
                    <HiMiniBuildingStorefront className="text-lg" />
                  )}
                  {account?.unit.unit}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`flex items-center gap-2 rounded-md px-3 py-0.5 text-sm font-semibold capitalize ${account?.status === "active" && "bg-green-200/70 text-green-600"} ${account?.status === "inactive" && "bg-red-200/70 text-red-600"}`}
                >
                  {account?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-shadow flex w-[30%] flex-col gap-3 rounded-md bg-white p-6">
          <h2 className="text-xl font-medium ">Account Relation</h2>
          <div className="flex flex-col gap-3 text-slate-500">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold text-slate-400">
                HIGHER RELATION :
              </div>
              <Link
                to={
                  account?.higherAccount
                    ? `/account-detail/${account?.higherAccount?.id}`
                    : "#"
                }
                className="font-medium text-[#5748ff]"
              >
                {account?.higherAccount?.name || "none"}
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold text-slate-400">
                LOWER RELATION :
              </div>
              {account?.lowerAccounts.length > 0 ? (
                account.lowerAccounts.map((account: Accounts) => (
                  <Link
                    to={`/account-detail/${account?.id}`}
                    key={account?.id}
                    className="cursor-pointer text-[#d37945]"
                  >
                    {account.name}
                  </Link>
                ))
              ) : (
                <div className="font-semibold text-red-500">none</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="box-shadow flex w-full items-center gap-6 rounded-md bg-white p-6">
        <div className="text-xl font-medium">Select Data to Display:</div>
        <div
          onClick={() => setDisplayedData("materials")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "materials" ? "bg-[#5748ff] text-white" : "text-slate-700 hover:bg-[#5748ff] hover:text-white"}`}
        >
          <Cable size={18} strokeWidth={1.7} />
          Materials
        </div>
        <div
          onClick={() => setDisplayedData("tools")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "tools" ? "bg-[#47bcc0] text-white" : "text-slate-700 hover:bg-[#47bcc0] hover:text-white"}`}
        >
          <Wrench size={18} strokeWidth={1.7} />
          Tools
        </div>
        <div
          onClick={() => setDisplayedData("vehicles")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "vehicles" ? "bg-[#b6734d] text-white" : "text-slate-700 hover:bg-[#b6734d] hover:text-white"}`}
        >
          <CarFront size={18} strokeWidth={1.7} />
          Vehicles
        </div>
        <div
          onClick={() => setDisplayedData("requests")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 duration-300 ${displayedData === "requests" ? "bg-[#c750c7] text-white" : "text-slate-700 hover:bg-[#c750c7] hover:text-white"}`}
        >
          <CarFront size={18} strokeWidth={1.7} />
          Requests
        </div>
      </div>
      {displayedData === "materials" && (
        <MaterialInventoryData
          materials={materials}
          isLoading={materialLoading}
          isError={materialError}
        />
      )}
      {displayedData === "tools" && <ToolInventory />}
      {displayedData === "vehicles" && (
        <VehicleInventoryData
          vehicles={vehicles}
          isLoading={vehicleLoading}
          isError={vehicleError}
        />
      )}
      {displayedData === "requests" && (
        <RequestData
          requests={requests}
          isLoading={requestLoading}
          isError={requestError}
        />
      )}
    </section>
  );
}
