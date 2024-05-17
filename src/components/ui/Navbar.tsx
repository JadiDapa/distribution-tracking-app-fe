import useAuthStore from "@/lib/store/AuthStore";
import SearchDialog from "./SearchDialog";
import { MdLogout } from "react-icons/md";
import Notifications from "./Notifications";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";

type Props = {
  handleOpen?: () => void;
};

export default function Navbar({ handleOpen }: Props) {
  const { userData, removeUser } = useAuthStore();
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userData");
    removeUser();
    navigate("/login");
  }
  return (
    <nav className="box-shadow flex w-full items-center justify-between rounded-md bg-white px-4 py-2">
      <div className="flex items-center gap-3">
        <Menu className="block lg:hidden" onClick={handleOpen} />
        <SearchDialog />
      </div>

      <div className="flex items-center gap-4">
        <Notifications />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="size-9 overflow-hidden rounded-full border-2 border-primary">
              <img
                className="w-full p-0.5"
                src={
                  userData?.picture ||
                  "https://res.cloudinary.com/dxxgiqzhc/image/upload/v1715254556/images-removebg-preview_cp546c.png"
                }
                alt=""
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to={`/account-detail/${userData?.id}`}
                  className="flex items-center gap-3"
                >
                  <BiUser className="text-lg" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex gap-3">
                <MdLogout className="text-lg" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
