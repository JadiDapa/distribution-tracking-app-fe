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
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  name: string;
};

export default function DeleteAccountRow({ id, name }: Props) {
  const { deleteAccount } = DeleteAccount();
  const { setStatus, setMessage } = useNotificationStore();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await deleteAccount(id);
      setStatus("success");
      setMessage("Account Deleted Successfully!");
      navigate("/account-list");
    } catch (error) {
      setStatus("error");
      setMessage("Something Went Wrong!");
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
