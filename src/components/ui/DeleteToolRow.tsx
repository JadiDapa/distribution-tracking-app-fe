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
import { DeleteTool } from "@/lib/network/useTool";

type Props = {
  id: string;
  name: string;
};

export default function DeleteToolRow({ id, name }: Props) {
  const { deleteTool, isError } = DeleteTool();
  const { setStatus, setMessage } = useNotificationStore();

  async function handleDelete() {
    await deleteTool(id);
    if (isError) {
      setStatus("error");
      setMessage("Something Went Wrong!");
    } else {
      setStatus("success");
      setMessage(`Tool ${name} Deleted Successfully!`);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-2 rounded-md bg-red-200/70 px-2 py-1 text-red-400">
        <Trash2 size={22} strokeWidth={1.5} />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Tool <span className="text-red-500">{name}</span>?
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
