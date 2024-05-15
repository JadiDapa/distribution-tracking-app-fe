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
import {
  MaterialCategories,
  MaterialControl,
  Materials,
} from "@/lib/types/material";
import { GetMaterialCategories } from "@/lib/network/useMaterialCategory";

type Props = {
  control: MaterialControl;
  values: Materials;
};

export default function MaterialInfoForm({ control }: Props) {
  const { categories } = GetMaterialCategories();
  console.log(categories);
  return (
    <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Material Information</h2>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material Name</FormLabel>
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
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue
                    className="capitalize"
                    placeholder="Select Category"
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category: MaterialCategories) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="mt-1.5 text-base capitalize text-slate-600"
                    >
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
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
          <FormItem className="h-80">
            <FormLabel>Detail</FormLabel>
            <FormControl className="h-64">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
