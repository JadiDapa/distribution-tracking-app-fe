type Props = {
  title: string;
  value: string;
  icon: React.ReactElement;
  detail: string;
  bgColor: string;
  textColor: string;
};

export default function SeperatedCard({
  title,
  value,
  icon,
  detail,
  bgColor,
  textColor,
}: Props) {
  return (
    <div className="box-shadow flex w-full justify-between rounded-md bg-white p-6 px-6">
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
