type Props = {
  title: string;
  value: string;
  icon: React.ReactElement;
  detail: string;
  bgColor: string;
  textColor: string;
};

export default function MaterialCard({
  title,
  value,
  icon,
  detail,
  bgColor,
  textColor,
}: Props) {
  return (
    <div className="flex w-full justify-between px-6 first:pl-0 last:pr-0">
      <div className="flex flex-col gap-2">
        <div className="text-lg">{title}</div>
        <div className="text-3xl">{value}</div>
        <div className="font-light">{detail}</div>
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-md text-lg"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {icon}
      </div>
    </div>
  );
}
