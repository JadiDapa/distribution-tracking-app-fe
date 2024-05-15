import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import useNotificationStore from "@/lib/store/NotificationStore";
import { DeleteMaterial } from "@/lib/network/useMaterial";

type Props = {
  id: string;
  name: string;
};

export default function DeleteMaterialRow({ id, name }: Props) {
  const { deleteMaterial, isError } = DeleteMaterial();
  const { setStatus, setMessage } = useNotificationStore();

  async function handleDelete() {
    await deleteMaterial(id);
    if (isError) {
      setStatus("error");
      setMessage("Something Went Wrong!");
    } else {
      setStatus("success");
      setMessage(`Material ${name} Deleted Successfully!`);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-2 rounded-md bg-red-200/70 px-2 py-1 text-red-400">
        <Trash2 size={18} />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Material <span className="text-red-500">{name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this data
            and remove all the related data from server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
