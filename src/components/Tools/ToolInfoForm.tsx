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
import { materialCategoryFilter } from "@/utils/static";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToolControl, Tools } from "@/lib/types/tool";

type Props = {
  control: ToolControl;
  values: Tools;
};

export default function ToolInfoForm({ control }: Props) {
  return (
    <div className="box-shadow flex h-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Tool Information</h2>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tool Name</FormLabel>
            <FormControl>
              <Input placeholder="ex: Posko-Sriwijaya" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-6">
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {materialCategoryFilter.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="mt-1.5 text-base text-slate-600"
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="sku"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="0123-4567-890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="detail"
        render={({ field }) => (
          <FormItem className="h-full">
            <FormLabel>Detail</FormLabel>
            <FormControl className="h-80">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
