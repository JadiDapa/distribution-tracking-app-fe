import { ChevronDown, ChevronRight, Circle } from "lucide-react";
import { useState } from "react";
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

export default function SiderbarLink({
  name,
  url,
  icon,
  segments,
  isOpen,
}: Props) {
  const [isDrop, setIsDrop] = useState(false);
  const location = useLocation();
  return (
    <>
      <Link
        onClick={() => setIsDrop(!isDrop)}
        to={url}
        className={`${isDrop ? "bg-slate-100" : ""} mt-2 flex items-center justify-between rounded-md px-2.5 py-1.5 duration-300 hover:bg-slate-100`}
      >
        <div className="flex items-center gap-3">
          <div className="text-lg">{icon}</div>
          <div className={`${isOpen ? "opacity-100" : "opacity-0"} text-lg`}>
            {name}
          </div>
        </div>
        {segments && (
          <div className="text-lg ">
            {isDrop ? (
              <ChevronDown strokeWidth={1.5} />
            ) : (
              <ChevronRight strokeWidth={1.5} />
            )}
          </div>
        )}
      </Link>
      {isDrop &&
        isOpen &&
        segments?.map((segment, i) => (
          <Link
            key={i}
            to={segment.url}
            className={`${location.pathname.includes(segment.url) ? "bg-primary text-white" : ""} mt-2 flex items-center justify-between rounded-md px-2.5 py-1.5 duration-300 hover:bg-slate-100`}
          >
            <div className="flex items-center gap-3">
              <div className="mr-2 ms-1 text-lg">
                <Circle size={12} strokeWidth={1.5} />
              </div>
              <div className={`text-lg`}>{segment.name}</div>
            </div>
          </Link>
        ))}
    </>
  );
}
