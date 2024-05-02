import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RequestControl } from "@/lib/types/request";

type Props = {
  control: RequestControl;
};

export default function InfoForm({ control }: Props) {
  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Request Information</h2>
      <div className="flex gap-6">
        <FormField
          control={control}
          name="reason"
          render={({ field }) => (
            <FormItem className="grow-[2]">
              <FormLabel>Request reason</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className=""
                  placeholder="Provide short reason for your request"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="requestedId"
          render={({ field }) => (
            <FormItem className="grow-[1]">
              <FormLabel>Requested Account</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requested account" />
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
