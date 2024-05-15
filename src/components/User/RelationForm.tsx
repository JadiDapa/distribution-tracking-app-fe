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
import { GetAccounts } from "@/lib/network/useAccounts";
import { AccountControl, Accounts } from "@/lib/types/account";
import { Building, Home, Warehouse } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  control: AccountControl;
  values: Accounts;
};

export default function RelationForm({ control, values }: Props) {
  const { accounts } = GetAccounts();
  return (
    <div className="box-shadow flex w-full flex-col  gap-6 rounded-md bg-white p-6 lg:w-[47%]">
      <h2 className="text-xl font-medium">Account Relation</h2>
      <FormField
        control={control}
        name="user"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account User</FormLabel>
            <FormControl>
              <Input placeholder="ex: John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="unitId"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Unit Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue="3"
                className="flex flex-wrap gap-4 lg:flex-nowrap"
              >
                <CustomRadio
                  values={values.unitId}
                  value="1"
                  desc="HQ"
                  label="Unit Pelaksana"
                  icon={<Building />}
                />
                <CustomRadio
                  values={values.unitId}
                  value="2"
                  desc="UL"
                  label="Unit Layanan"
                  icon={<Warehouse />}
                />
                <CustomRadio
                  values={values.unitId}
                  value="3"
                  desc="Posko"
                  label="Posko"
                  icon={<Home />}
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {values.unitId === "3" && (
        <FormField
          control={control}
          name="higherAccountId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Related Accounts</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="Select related account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts
                    .filter((account: Accounts) => account.unitId === 2)
                    .map((account: Accounts) => (
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
      )}
    </div>
  );
}
