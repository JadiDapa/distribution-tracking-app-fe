import { useState } from "react";
import SeactionHeader from "@/components/ui/SeactionHeader";
import DeleteAccountRow from "@/components/ui/DeleteAccountRow";
import DataLoading from "@/components/ui/DataLoading";
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
import ToolInventoryTable from "@/components/Tools/ToolInventoryTable";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { toolInventory } from "@/utils/table/tool-inventory";
import MaterialInventoryTable from "@/components/Material/MaterialInventoryTable";
import { materialInventory } from "@/utils/table/material-inventory";
import { vehicleInventory } from "@/utils/table/vehicle-inventory";
import { requestColumns } from "@/utils/table/request-column";
import RequestTable from "@/components/Request/RequestTable";
import VehicleInventoryTable from "@/components/Vehicle/VehicleInventoryTable";

export default function AccountDetail() {
  const { accountId } = useParams();

  const { materials } = GetMaterialInventories(accountId);
  const { tools } = GetToolInventories(accountId);
  const { vehicles } = GetVehiclesByAccountId(accountId);
  const { requests } = GetRequestByAccountId(accountId);

  const { account, isLoading, isError } = GetAccountById(accountId!);
  const [displayedData, setDisplayedData] = useState<
    "materials" | "tools" | "vehicles" | "requests"
  >("materials");

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Account" subSection="Account Detail" />
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6 lg:w-[70%] lg:flex-row">
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
              <DeleteAccountRow id={account?.id} name={account?.name} />
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
        <div className="box-shadow flex  w-full flex-col gap-3 rounded-md bg-white p-6 lg:w-[30%]">
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
      <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6 lg:flex-row lg:items-center">
        <div className="text-xl font-medium">Select Data to Display:</div>
        <div className="flex w-full flex-wrap gap-4 lg:gap-6">
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
      </div>
      {displayedData === "materials" && (
        <MaterialInventoryTable columns={materialInventory} data={materials} />
      )}
      {displayedData === "tools" && (
        <ToolInventoryTable columns={toolInventory} data={tools} />
      )}
      {displayedData === "vehicles" && (
        <VehicleInventoryTable columns={vehicleInventory} data={vehicles} />
      )}
      {displayedData === "requests" && (
        <RequestTable columns={requestColumns} data={requests} />
      )}
    </section>
  );
}
