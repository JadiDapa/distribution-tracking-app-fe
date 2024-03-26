import CustomRadio from "@/components/ui/CustomRadio";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Building, PowerOff } from "lucide-react";
import { Control } from "react-hook-form";

type Props = {
  control: Control<{
    account: string;
    user: string;
    password: string;
    confirmPassword: string;
    status: "Active" | "Inactive";
    category: "Unit Pelaksana" | "Unit Layanan" | "Posko";
    relation?: string;
  }>;
  values: {
    account: string;
    user: string;
    password: string;
    confirmPassword: string;
    status: "Active" | "Inactive";
    category: "Unit Pelaksana" | "Unit Layanan" | "Posko";
    relation?: string | undefined;
  };
};

export default function InfoForm({ control, values }: Props) {
  return (
    <div className="box-shadow flex w-[53%] flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Account Information</h2>
      <FormField
        control={control}
        name="account"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Name</FormLabel>
            <FormControl>
              <Input placeholder="ex: Posko-Sriwijaya" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Account password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input placeholder="Confirm password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Account Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-6"
              >
                <CustomRadio
                  values={values.status}
                  value="Active"
                  desc="Account is enabled"
                  label="Active"
                  icon={<Building />}
                />
                <CustomRadio
                  values={values.status}
                  value="Inactive"
                  desc="Account is disabled"
                  label="Inactive"
                  icon={<PowerOff />}
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
