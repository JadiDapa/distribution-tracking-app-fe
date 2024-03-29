import SiderbarLink from "./SidebarLink";
import {
  BusFront,
  Cable,
  CarFront,
  CircuitBoard,
  Home,
  Truck,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";
import { LiaToolsSolid } from "react-icons/lia";

const sidebarLink = [
  {
    name: "Dashboard",
    url: "/",
    icon: <Home strokeWidth={1.5} />,
  },
  {
    name: "Distribution",
    url: "/distribution",
    icon: <Truck strokeWidth={1.5} />,
  },
  {
    name: "Related Account",
    url: "/account-related",
    icon: <UserRound strokeWidth={1.5} />,
  },
  {
    name: "Materials",
    url: "/material-inventory",
    icon: <Cable strokeWidth={1.5} />,
  },
  {
    name: "Tools",
    url: "/tool-inventory",
    icon: <Wrench className="text-2xl" />,
  },
  {
    name: "Vehicles",
    url: "/vehicle-inventory",
    icon: <CarFront strokeWidth={1.5} />,
  },
];

const adminSidebarLink = [
  {
    name: "Account List",
    url: "/account-list",
    icon: <UsersRound strokeWidth={1.5} />,
  },
  {
    name: "Material List",
    url: "/material-list",
    icon: <CircuitBoard strokeWidth={1.5} />,
  },
  {
    name: "Tool List",
    url: "/tool-list",
    icon: <LiaToolsSolid className="text-2xl" />,
  },
  {
    name: "Vehicle List",
    url: "/vehicle-list",
    icon: <BusFront strokeWidth={1.5} />,
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsOpen }: Props) {
  return (
    <nav
      className={`${isOpen ? "w-72" : "w-[76px]"} box-shadow fixed min-h-screen overflow-hidden bg-white p-4 transition-all duration-500`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <img
            onClick={() => setIsOpen(!isOpen)}
            src="/images/logo-only.png"
            className="w-12"
          />
          <div
            className={`${isOpen ? "block" : "hidden"} text-2xl font-extrabold tracking-wider text-[#00AFEF]`}
          >
            PLN
          </div>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl text-slate-900"
        >
          <i className="bi bi-chevron-double-left"></i>
        </div>
      </div>

      <div className="mt-8">
        {sidebarLink.map((link) => (
          <SiderbarLink
            key={link.name}
            name={link.name}
            url={link.url}
            icon={link.icon}
            isOpen={isOpen}
          />
        ))}
        <div className="mt-8">ADMIN WORKSPACE</div>
        {adminSidebarLink.map((link) => (
          <SiderbarLink
            key={link.name}
            name={link.name}
            url={link.url}
            icon={link.icon}
            isOpen={isOpen}
          />
        ))}
      </div>
    </nav>
  );
}
