import { FormControl, FormItem, FormLabel } from "./form";
import { RadioGroupItem } from "./radio-group";

type Props = {
  values: string | undefined;
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
};

const CustomRadio = ({ values, value, label, desc, icon }: Props) => {
  return (
    <FormItem
      className={`${values === value && "border-primary bg-blue-100/20 text-primary"} relative  size-36  overflow-hidden rounded-md border-[3px] transition-all duration-300`}
    >
      <FormLabel className="flex h-full w-full flex-col items-center justify-center gap-1">
        {icon}
        <div className="text-lg">{label}</div>
        <p className="text-center text-sm font-light">{desc}</p>
      </FormLabel>
      <FormControl className="relative ">
        <RadioGroupItem
          className="absolute left-0 top-0 opacity-0"
          value={value}
        />
      </FormControl>
    </FormItem>
  );
};

export default CustomRadio;
