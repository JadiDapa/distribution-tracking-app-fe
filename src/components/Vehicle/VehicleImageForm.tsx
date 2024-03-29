import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { VehicleType } from "@/pages/vehicle/VehicleCreate";

type Props = {
  control: Control<VehicleType>;
  values: VehicleType;
};

export default function VehicleImageForm({ control }: Props) {
  return (
    <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Vehicle Picture</h2>
      <div className="relative flex h-60 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed">
        <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Upload size={28} strokeWidth={1.75} />
        </div>
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <div className="max-w-80 text-2xl text-muted-foreground">
            Drop vehichle picture here
          </div>
          <div className="text-xl text-slate-400">Or</div>
          <Button type="button" className="max-w-fit bg-sky-100 text-primary">
            Browse Image
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="absolute left-0 top-0 h-full w-full border opacity-0"></FormLabel>
                  <FormControl>
                    <Input
                      className="absolute left-0 top-0 opacity-0"
                      type="file"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
