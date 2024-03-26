import { FormControl, FormItem } from "./form";
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
      className={`${values === value && "border-primary bg-blue-100/20 text-primary"} t relative flex size-36 flex-col items-center justify-center gap-1 rounded-md border-[3px] transition-all duration-300`}
    >
      <FormControl>
        <>
          <RadioGroupItem
            className="absolute left-0 top-0 h-full w-full opacity-0"
            value={value}
          />
          {icon}
          <div className="text-lg">{label}</div>
          <p className="text-center text-sm font-light">{desc}</p>
        </>
      </FormControl>
    </FormItem>
  );
};

export default CustomRadio;
