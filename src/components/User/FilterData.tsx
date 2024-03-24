import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder: string;
  options: Options[];
};

type Options = {
  name: string;
  value: string;
};

export default function FilterData({ placeholder, options }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-full text-base">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="mt-1.5 text-base text-slate-600"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
