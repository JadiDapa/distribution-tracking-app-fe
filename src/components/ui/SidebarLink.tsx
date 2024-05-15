import { Link, useLocation } from "react-router-dom";

type Props = {
  name: string;
  url: string;
  icon: React.ReactElement;
  segments?: Segments[];
};

type Segments = {
  name: string;
  url: string;
};

export default function SiderbarLink({ name, url, icon }: Props) {
  const location = useLocation();

  return (
    <>
      <Link
        to={url}
        className={`${location.pathname === url ? "bg-primary text-white shadow-md" : "hover:bg-slate-100"} mt-1 flex w-full items-center justify-between rounded-md px-2.5 py-2 duration-300`}
      >
        <div className={`"justify-center flex items-center gap-3`}>
          <div>{icon}</div>
          <div>{name}</div>
        </div>
      </Link>
    </>
  );
}
