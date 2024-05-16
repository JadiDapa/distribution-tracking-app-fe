import { Cable, Pencil } from "lucide-react";
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
import { GetToolById } from "@/lib/network/useTool";
import DeleteToolRow from "../ui/DeleteToolRow";
import useAuthStore from "@/lib/store/AuthStore";

type Props = {
  id: string;
};

export default function ToolDetail({ id }: Props) {
  const { userData } = useAuthStore();
  const { tool } = GetToolById(id);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer duration-300 hover:text-primary ">
        {tool?.name}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Tool Detail</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-md border-2">
                {tool?.picture ? (
                  <img className="w-full" src={tool?.picture} alt="" />
                ) : (
                  <Cable size={80} />
                )}
              </div>
              <div
                className={`flex h-8 max-w-fit items-center gap-2 rounded-md px-3 py-0.5 text-sm font-semibold capitalize ${tool?.status === "available" && "bg-green-200/70 text-green-600"} ${tool?.status === "unavailable" && "bg-red-200/70 text-red-600"}`}
              >
                {tool?.status}
              </div>
            </div>
            <div className="flex w-auto justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium text-primary">
                  {tool?.name}
                </div>
                <div className="flex gap-3">
                  <span>SKU:</span>
                  {tool?.sku}
                </div>
                <div className="flex gap-3">
                  <span>Category:</span>
                  {tool?.category.category}
                </div>
                <div className="flex gap-3">
                  <span>Expired At:</span>
                  {tool?.expired_at.slice(0, 7)}
                </div>
              </div>
            </div>
          </div>
          {tool?.detail && (
            <div className="mt-6 flex flex-col gap-4">
              <div className="text-sm font-semibold text-slate-400">DETAIL</div>

              <div
                className="no-tailwind-base"
                dangerouslySetInnerHTML={{ __html: tool?.detail }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 lg:hidden">
          {userData?.id === 1 && (
            <>
              <Link
                to={"/tool-edit/" + tool?.id}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-0.5 text-white"
              >
                <Pencil size={16} />
                Edit
              </Link>
              <DeleteToolRow id={tool?.id} name={tool?.name} />
            </>
          )}
        </div>
        <AlertDialogCancel className="h-9 lg:hidden">Close</AlertDialogCancel>

        <AlertDialogFooter className="hidden lg:flex">
          {userData?.id === 1 && (
            <>
              <Link
                to={"/tool-edit/" + tool?.id}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-0.5 text-white"
              >
                <Pencil size={16} />
                Edit
              </Link>
              <DeleteToolRow id={tool?.id} name={tool?.name} />
            </>
          )}
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
