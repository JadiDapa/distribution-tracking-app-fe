type Props = {
  title: string;
  value: string;
  icon: React.ReactElement;
  detail?: string;
  bgColor: string;
  textColor: string;
};

export default function ConnectedCard({
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
        <div className="">{title}</div>
        <div className="text-2xl">{value}</div>
        <div className="text-sm font-light">{detail}</div>
      </div>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {icon}
      </div>
    </div>
  );
}
