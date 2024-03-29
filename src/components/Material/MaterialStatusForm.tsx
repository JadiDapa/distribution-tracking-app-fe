import CustomRadio from "@/components/ui/CustomRadio";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { BadgeCheck, BadgeX } from "lucide-react";
import { Control } from "react-hook-form";

type Props = {
  control: Control<{
    name: string;
    category: string;
    status: string;
    sku: string;
    description: string;
    image: string;
  }>;
  values: {
    name: string;
    category: string;
    status: string;
    sku: string;
    description: string;
    image: string;
  };
};

export default function MaterialStatusForm({ control, values }: Props) {
  return (
    <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium">Material Status</h2>
      <div className="">
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex justify-center gap-6"
                >
                  <CustomRadio
                    values={values.status}
                    value="available"
                    desc="Material will appear"
                    label="Available"
                    icon={<BadgeCheck size={32} />}
                  />
                  <CustomRadio
                    values={values.status}
                    value="unavailable"
                    desc="Material wont appear"
                    label="Unavailable"
                    icon={<BadgeX size={32} />}
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}