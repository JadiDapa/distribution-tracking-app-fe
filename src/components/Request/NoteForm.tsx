import ReactQuill from "react-quill";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RequestControl } from "@/lib/types/request";

type Props = {
  control: RequestControl;
};

export default function NoteForm({ control }: Props) {
  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Detail & Notes</h2>
      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem className="h-72 lg:h-64">
            <FormLabel>Detail</FormLabel>
            <FormControl className="h-48">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
