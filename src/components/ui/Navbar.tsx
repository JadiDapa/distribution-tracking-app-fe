import useAuthStore from "@/lib/store/AuthStore";
import SearchDialog from "./SearchDialog";

import Notifications from "./Notifications";
import { Menu } from "lucide-react";

type Props = {
  handleOpen?: () => void;
};

export default function Navbar({ handleOpen }: Props) {
  const { userData } = useAuthStore();
  return (
    <nav className="box-shadow flex w-full items-center justify-between rounded-md bg-white px-4 py-2">
      <div className="flex items-center gap-3">
        <Menu className="block lg:hidden" onClick={handleOpen} />
        <SearchDialog />
      </div>

      <div className="flex items-center gap-4">
        <Notifications />

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
      </div>
    </nav>
  );
}
