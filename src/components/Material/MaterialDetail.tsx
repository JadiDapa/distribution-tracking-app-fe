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
import { GetMaterialById } from "@/lib/network/useMaterial";
import { Link } from "react-router-dom";
import DeleteMaterialRow from "../ui/DeleteMaterialRow";

type Props = {
  id: string;
  quantity?: string | number;
};

export default function MaterialDetail({ id, quantity }: Props) {
  const { material } = GetMaterialById(id);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer duration-300 hover:text-primary ">
        {material?.name}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Material Detail
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="flex gap-6">
            <div className="flex size-28 items-center justify-center overflow-hidden rounded-md border-2">
              {material?.picture ? (
                <img className="w-full" src={material?.picture} alt="" />
              ) : (
                <Cable size={80} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium text-primary">
                {material?.name}
              </div>
              <div className="flex gap-3">
                <span>SKU:</span>
                {material?.sku}
              </div>
              <div className="flex gap-3">
                <span>Unit:</span>
                <span className="capitalize">
                  {material?.category.category}
                </span>
              </div>
              {quantity ? (
                <div className="flex gap-3">
                  <span>Quantity:</span>
                  <span className="text-primary">{quantity}</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <span>Status:</span>
                  <span
                    className={`flex items-center gap-2 rounded-md px-3 py-0.5 text-sm font-semibold capitalize ${material?.status === "available" && "bg-green-200/70 text-green-600"} ${material?.status === "unavailable" && "bg-red-200/70 text-red-600"}`}
                  >
                    {material?.status}
                  </span>
                </div>
              )}
            </div>
          </div>
          {material?.detail && (
            <div className="mt-6 flex flex-col gap-4">
              <div className="text-sm font-semibold text-slate-400">DETAIL</div>

              <div
                className="no-tailwind-base"
                dangerouslySetInnerHTML={{ __html: material?.detail }}
              />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Link
            to={"/material-edit/" + material?.id}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-0.5 text-white"
          >
            <Pencil size={16} />
            Edit
          </Link>

          <DeleteMaterialRow id={material?.id} name={material?.name} />

          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
