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
import { materialCategoryFilter } from "@/utils/static";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { VehicleType } from "@/pages/vehicle/VehicleCreate";

type Props = {
  control: Control<VehicleType>;
  values: VehicleType;
};

// "police-number": string;
// variant: string;
// brand: string;
// color: string;
// cc: string;
// fuel: string;
// year: string;
// "contract-start": Date;
// "contract-end": Date;
// area: string;
// location: string;
// image: string;

export default function VehicleInfoForm({ control }: Props) {
  return (
    <div className="box-shadow flex h-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Vehicle Information</h2>
      <FormField
        control={control}
        name="police_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vehicle Police Number</FormLabel>
            <FormControl>
              <Input placeholder="ex: B 1234 AB" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-6">
        <FormField
          control={control}
          name="variant"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Vehicle Variant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base ">
                  <SelectValue placeholder="Select Variant" />
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
          name="brand"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Vehicle Brand</FormLabel>
              <FormControl>
                <Input placeholder="ex: Toyota Avanza" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-6">
        <FormField
          control={control}
          name="cc"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cilinder Capacity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="ex: 1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="fuel"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Type of Fuel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base ">
                  <SelectValue placeholder="Select the vehicle type of fuel" />
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
      </div>

      <FormField
        control={control}
        name="detail"
        render={({ field }) => (
          <FormItem className="h-60">
            <FormLabel>Other Details</FormLabel>
            <FormControl className="h-full">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
