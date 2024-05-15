import { Materials } from "@/lib/types/material";
import { Requests } from "@/lib/types/request";
import { Tools } from "@/lib/types/tool";
import { Vehicles } from "@/lib/types/vehicle";
import { ArchiveRestore, Cable, CarFront, Wrench } from "lucide-react";

type Props = {
  requests: Requests[];
  materials: Materials[];
  tools: Tools[];
  vehicles: Vehicles[];
};

export default function DashboardStatistic({
  requests,
  materials,
  tools,
  vehicles,
}: Props) {
  return (
    <div className="box-shadow w-4/6 rounded-md bg-white p-6">
      <p className="text-xl text-primary">Statistics</p>
      <div className="mt-6 flex w-full justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-200/50">
            <ArchiveRestore size={20} className="text-blue-500" />
          </div>
          <div className="">
            <div className="text-lg font-medium">{requests.length}</div>
            <div className="text-sm">Request Sent</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-green-200/50">
            <Cable size={20} className="text-green-500" />
          </div>
          <div className="">
            <div className="text-lg font-medium">{materials.length}</div>
            <div className="text-sm">Materials</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-200/50">
            <Wrench size={20} className="text-yellow-500" />
          </div>
          <div className="">
            <div className="text-lg font-medium">{tools.length}</div>
            <div className="text-sm">Tools</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-red-200/50">
            <CarFront size={20} className="text-red-500" />
          </div>
          <div className="">
            <div className="text-lg font-medium">{vehicles.length}</div>
            <div className="text-sm">Vehicles</div>
          </div>
        </div>
      </div>
    </div>
  );
}
