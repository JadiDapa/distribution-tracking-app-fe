import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  control: Control<{
    requester: string;
    requested: string;
    note?: string | undefined;
  }>;
};

export default function InfoForm({ control }: Props) {
  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Request Information</h2>
      <div className="grid grid-cols-3 gap-6">
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Item Type</FormLabel>
              <FormControl>
                <Input {...field} className=" disabled:text-black" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="requested"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Requested Account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Unit Layanan - Idunno</SelectItem>
                  <SelectItem value="2">Unit Layanan - Pekanbaru</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
