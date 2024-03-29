import { Link, useLocation } from "react-router-dom";

type Props = {
  name: string;
  url: string;
  icon: React.ReactElement;
  segments?: Segments[];
  isOpen: boolean;
};

type Segments = {
  name: string;
  url: string;
};

export default function SiderbarLink({ name, url, icon, isOpen }: Props) {
  const location = useLocation();

  return (
    <>
      <Link
        to={url}
        className={`${location.pathname === url ? "bg-primary text-white shadow-md" : "hover:bg-slate-100"} mt-2 flex items-center justify-between rounded-md px-2.5 py-2 duration-300`}
      >
        <div className="flex items-center gap-3">
          <div className="text-lg">{icon}</div>
          <div className={`${isOpen ? "opacity-100" : "opacity-0"} text-lg`}>
            {name}
          </div>
        </div>
      </Link>
    </>
  );
}
