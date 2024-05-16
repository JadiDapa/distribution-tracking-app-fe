import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import useNotificationStore from "@/lib/store/NotificationStore";
import { Input } from "../ui/input";
import { CreateMaterialCategory } from "@/lib/network/useMaterialCategory";

export default function AddMaterialCategory() {
  const { postMaterialCategory } = CreateMaterialCategory();
  const [category, setCategory] = useState("");
  const { setStatus, setMessage } = useNotificationStore();

  async function handleClick() {
    try {
      postMaterialCategory({ category: category });
      setStatus("success");
      setMessage("Material Category Created Successfully!");
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Something went wrong!");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="my-1.5 flex cursor-pointer items-center gap-3 px-8 text-slate-600 duration-300 hover:text-primary">
        <span>Add New Category</span>
        <Plus size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            Add New Material Category
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Input onChange={(e) => setCategory(e.target.value)} />
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>Submit</AlertDialogAction>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
