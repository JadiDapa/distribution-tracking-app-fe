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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToolCategory, ToolControl, Tools } from "@/lib/types/tool";
import { GetToolCategories } from "@/lib/network/useToolCategory";
import AddToolCategory from "./AddToolCategory";

type Props = {
  control: ToolControl;
  values: Tools;
};

export default function ToolInfoForm({ control }: Props) {
  const { categories } = GetToolCategories();

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
      <div className="flex flex-col gap-6 lg:flex-row">
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue
                    className="capitalize"
                    placeholder="Select Category"
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: ToolCategory) => (
                    <SelectItem
                      key={category.id}
                      value={category.id!.toString()}
                      className="mt-1.5 text-base capitalize text-slate-600"
                    >
                      {category.category}
                    </SelectItem>
                  ))}

                  <AddToolCategory />
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
          <FormItem className="h-96">
            <FormLabel>Detail</FormLabel>
            <FormControl className="h-72 lg:h-80">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
