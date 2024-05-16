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
    <>
      <div className="box-shadow hidden w-full justify-between rounded-md bg-white p-6 lg:flex">
        <div className="flex flex-col gap-2">
          <div>{title}</div>
          <div className="text-2xl">{value}</div>
          <div className="text-sm font-light">{detail}</div>
        </div>
        <div
          className="flex size-10 items-center justify-center rounded-md text-2xl"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {icon}
        </div>
      </div>

      {/* Mobile Card */}
      <div className="box-shadow flex w-full justify-between rounded-md bg-white p-6 lg:hidden">
        <div className="flex items-center gap-4">
          <div
            className="flex size-10 items-center justify-center rounded-md text-2xl"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {icon}
          </div>
          <div className="flex flex-col">
            <div>{title}</div>
            <div className="text-sm font-light">{detail}</div>
          </div>
        </div>
        <div className="">
          <div className="text-2xl">{value}</div>
        </div>
      </div>
    </>
  );
}
