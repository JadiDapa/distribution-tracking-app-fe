import { Bell, CircleAlert } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "./separator";
import useAuthStore from "@/lib/store/AuthStore";
import { GetRequestInboxs } from "@/lib/network/useRequest";
import { Link } from "react-router-dom";
import { Requests } from "@/lib/types/request";

export default function Notifications() {
  const { userData } = useAuthStore();
  const { requests, isLoading, isError } = GetRequestInboxs(
    userData?.id.toString(),
  );

  const pendingRequest = requests?.filter(
    (request: Requests) => request.status === "pending",
  );

  if (isError) return <Bell size={24} className="cursor-pointer" />;
  if (isLoading) return <Bell size={24} className="cursor-pointer" />;

  if (requests && pendingRequest) {
    return (
      <Sheet>
        <SheetTrigger className="relative">
          <Bell size={24} className="cursor-pointer" />
          {pendingRequest.length >= 1 && (
            <div className="absolute -right-1 -top-1 size-4 rounded-full bg-red-500 text-xs text-white">
              {pendingRequest.length}
            </div>
          )}
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              These are notifications related to your works
            </SheetDescription>
          </SheetHeader>
          <Separator className="mt-6 " />
          <div className="flex flex-col divide-y">
            {pendingRequest.map((request: Requests, index: number) => (
              <Link
                key={index}
                to={`/request-inbox/${request.id}`}
                className="cursor-pointer py-3 duration-300 hover:bg-slate-100"
              >
                <div className="flex gap-4">
                  <CircleAlert size={40} className="text-red-500" />
                  <div className="">
                    <div>{request.requester!.name} Requesting</div>
                    <div className="text-sm text-slate-500">a minute ago</div>
                    <div className="">
                      A new request from{" "}
                      <span className="strong text-primary">
                        {request.requester!.name}
                      </span>
                      , asking for some{" "}
                      <span className="italic text-primary text-yellow-500">
                        {request.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
}
