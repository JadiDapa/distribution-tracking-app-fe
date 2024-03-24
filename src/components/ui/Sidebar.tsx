import SiderbarLink from "./SidebarLink";
import { sidebarLink } from "@/utils/static";

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

      <div className="mt-6">
        {sidebarLink.map((link) => (
          <SiderbarLink
            key={link.name}
            name={link.name}
            url={link.url}
            icon={link.icon}
            segments={link.segments}
            isOpen={isOpen}
          />
        ))}
      </div>
    </nav>
  );
}
