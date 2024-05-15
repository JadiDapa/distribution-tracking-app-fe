import SiderbarLink from "./SidebarLink";
import {
  ArchiveRestore,
  BusFront,
  Cable,
  CarFront,
  CircuitBoard,
  Home,
  UserRound,
  UsersRound,
  WrenchIcon,
  X,
} from "lucide-react";
import { LiaToolsSolid } from "react-icons/lia";
import { CiInboxIn } from "react-icons/ci";

const sidebarLink = [
  {
    name: "Dashboard",
    url: "/",
    icon: <Home strokeWidth={1.5} size={20} />,
  },
  {
    name: "Relation",
    url: "/account-related",
    icon: <UserRound strokeWidth={1.5} size={20} />,
  },
  {
    name: "Request",
    url: "/request-list",
    icon: <ArchiveRestore strokeWidth={1.5} size={20} />,
  },
  {
    name: "Inbox",
    url: "/request-inbox",
    icon: <CiInboxIn className="text-2xl font-semibold" />,
  },
  {
    name: "Materials",
    url: "/material-inventory",
    icon: <Cable strokeWidth={1.5} size={20} />,
  },
  {
    name: "Tools",
    url: "/tool-inventory",
    icon: <WrenchIcon strokeWidth={1.5} size={20} />,
  },
  {
    name: "Vehicles",
    url: "/vehicle-inventory",
    icon: <CarFront strokeWidth={1.5} size={20} />,
  },
];

const adminSidebarLink = [
  {
    name: "Account List",
    url: "/account-list",
    icon: <UsersRound strokeWidth={1.5} size={20} />,
  },
  {
    name: "Material List",
    url: "/material-list",
    icon: <CircuitBoard strokeWidth={1.5} size={20} />,
  },
  {
    name: "Tool List",
    url: "/tool-list",
    icon: <LiaToolsSolid className="text-2xl" />,
  },
  {
    name: "Vehicle List",
    url: "/vehicle-list",
    icon: <BusFront strokeWidth={1.5} size={20} />,
  },
];

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
};

export default function Sidebar({ isOpen, handleOpen }: Props) {
  return (
    <aside
      className={`box-shadow fixed z-50 min-h-screen w-[260px] overflow-hidden bg-white p-4 transition-all duration-500 ${isOpen ? "translate-x-0" : "max-lg:-translate-x-full"}`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <img src="/images/logo-only.png" className="w-11" />
          <div className="blocktext-2xl font-extrabold tracking-wider text-[#00AFEF]">
            PLN
          </div>
        </div>
        <X onClick={handleOpen} size={24} strokeWidth={1.5} />
      </div>

      <div className="mt-4">
        {sidebarLink.map((link) => (
          <SiderbarLink
            key={link.name}
            name={link.name}
            url={link.url}
            icon={link.icon}
          />
        ))}

        <div className="mt-4">ADMIN WORKSPACE</div>

        {adminSidebarLink.map((link) => (
          <SiderbarLink
            key={link.name}
            name={link.name}
            url={link.url}
            icon={link.icon}
          />
        ))}
      </div>
    </aside>
  );
}
