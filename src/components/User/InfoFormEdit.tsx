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
// import { useState } from "react";

type Props = {
  control: AccountControl;
  values: Accounts;
};

export default function InfoFormEdit({ control, values }: Props) {
  // const [isChangePassword, setIsChangePassword] = useState(false);
  return (
    <div className="box-shadow flex w-[53%] flex-col gap-6 rounded-md bg-white p-6">
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
      {/* {isChangePassword && (
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <div
        onClick={() => setIsChangePassword(!isChangePassword)}
        className={`max-w-fit cursor-pointer rounded-md  px-3 py-1.5 text-white ${isChangePassword ? "bg-red-500" : "bg-yellow-500"}`}
      >
        {isChangePassword
          ? "Cancel Password Change"
          : "Change Account Password?"}
      </div> */}
    </div>
  );
}
