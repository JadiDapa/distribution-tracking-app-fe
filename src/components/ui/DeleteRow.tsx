import { DeleteAccount } from "@/lib/network/useAccounts";
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

type Props = {
  id: string;
  name: string;
};

export default function DeleteRow({ id, name }: Props) {
  const { deleteAccount } = DeleteAccount();
  const { setStatus, setMessage } = useNotificationStore();

  async function handleDelete() {
    try {
      await deleteAccount(id);
      setStatus("success");
      setMessage("Account Deleted Successfully!");
    } catch (error) {
      setStatus("error");
      setMessage("Something Went Wrong!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 size={22} strokeWidth={1.5} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Data <span className="text-red-500">{name}</span>?
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
