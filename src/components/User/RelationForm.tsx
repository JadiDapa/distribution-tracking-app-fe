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
import { Building, Home, Warehouse } from "lucide-react";
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

export default function RelationForm({ control, values }: Props) {
  console.log(values);
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
        name="category"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Category</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex justify-between"
              >
                <CustomRadio
                  values={values.category}
                  value="Unit Pelaksana"
                  desc="HQ"
                  label="Unit Pelaksana"
                  icon={<Building />}
                />
                <CustomRadio
                  values={values.category}
                  value="Unit Layanan"
                  desc="UL"
                  label="Unit Layanan"
                  icon={<Warehouse />}
                />
                <CustomRadio
                  values={values.category}
                  value="Posko"
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
      {values.category === "Posko" && (
        <FormField
          control={control}
          name="relation"
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
