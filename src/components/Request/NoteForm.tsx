import ReactQuill from "react-quill";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control } from "react-hook-form";

type Props = {
  control: Control<{
    requester: string;
    requested: string;
    note?: string | undefined;
  }>;
};

export default function NoteForm({ control }: Props) {
  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Detail & Notes</h2>
      <FormField
        control={control}
        name="note"
        render={({ field }) => (
          <FormItem className="h-60">
            <FormLabel>Detail</FormLabel>
            <FormControl className="h-44">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
