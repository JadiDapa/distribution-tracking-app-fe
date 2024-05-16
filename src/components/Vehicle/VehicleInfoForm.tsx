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
import { Vehicles, VehicleControl, VehicleVariants } from "@/lib/types/vehicle";
import { GetVehicleVariants } from "@/lib/network/useVehicleVariant";
import { GetAccounts } from "@/lib/network/useAccounts";
import { Accounts } from "@/lib/types/account";

type Props = {
  control: VehicleControl;
  values: Vehicles;
};

export default function VehicleInfoForm({ control }: Props) {
  const { categories } = GetVehicleVariants();
  const { accounts } = GetAccounts();
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
      <div className="flex flex-col gap-6 lg:flex-row">
        <FormField
          control={control}
          name="variantId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Vehicle Variant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base ">
                  <SelectValue placeholder="Select Variant" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((variant: VehicleVariants) => (
                    <SelectItem
                      key={variant.id}
                      value={variant.id.toString()}
                      className="mt-1.5 text-base capitalize text-slate-600"
                    >
                      {variant.category}
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
      <div className="flex flex-col gap-6 lg:flex-row">
        <FormField
          control={control}
          name="areaId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Vehicle Area (UL)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base ">
                  <SelectValue placeholder="Select current vehicle area" />
                </SelectTrigger>
                <SelectContent>
                  {accounts
                    ?.filter((account: Accounts) => Number(account.unitId) < 3)
                    ?.map((account: Accounts) => (
                      <SelectItem
                        key={account.id}
                        value={account.id!.toString()}
                        className="mt-1.5 text-base text-slate-600"
                      >
                        {account.name}
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
          name="locationId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Vehicle Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="Select vehicle current exact location" />
                </SelectTrigger>
                <SelectContent>
                  {accounts?.map((option: Accounts) => (
                    <SelectItem
                      key={option.id}
                      value={option.id!.toString()}
                      className="mt-1.5 text-base text-slate-600"
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <FormLabel>Other Details</FormLabel>
            <FormControl className="h-56 lg:h-64">
              <ReactQuill theme="snow" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
