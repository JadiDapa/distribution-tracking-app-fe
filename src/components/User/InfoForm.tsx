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
import { AccountControl, Accounts } from "@/lib/types/account";
import { Power, PowerOff } from "lucide-react";

type Props = {
  control: AccountControl;
  values: Accounts;
};

export default function InfoForm({ control, values }: Props) {
  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6 lg:w-[53%]">
      <h2 className="text-xl font-medium ">Account Information</h2>
      <FormField
        control={control}
        name="name"
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
                className="flex gap-4 lg:gap-6"
              >
                <CustomRadio
                  values={values.status}
                  value="active"
                  desc="Account is enabled"
                  label="Active"
                  icon={<Power />}
                />
                <CustomRadio
                  values={values.status}
                  value="inactive"
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
