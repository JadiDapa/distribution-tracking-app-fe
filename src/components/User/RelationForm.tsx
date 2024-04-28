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
import { Building, Home, Warehouse } from "lucide-react";

type Props = {
  control: AccountControl;
  values: Accounts;
};

export default function RelationForm({ control, values }: Props) {
  return (
    <div className="box-shadow flex w-[47%]  flex-col gap-6 rounded-md bg-white p-6">
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
                className="flex justify-between"
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
            <FormItem>
              <FormLabel>Relation</FormLabel>
              <FormControl>
                <Input placeholder="Related into" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
