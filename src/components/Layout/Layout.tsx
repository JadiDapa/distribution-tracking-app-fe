import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import useAuthStore from "@/lib/store/AuthStore";
import { Toaster, toast } from "sonner";
import useNotificationStore from "@/lib/store/NotificationStore";
import { ToasterUI } from "../ui/toaster";

function Layout() {
  const { userData } = useAuthStore();
  const { status, message, setStatus, setMessage } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      toast.success(message, {
        position: "top-center",
        duration: 3000,
      });
    }
    if (status === "error") {
      toast.error(message, {
        position: "top-center",
        duration: 3000,
      });
    }
    setTimeout(() => {
      setStatus(null);
      setMessage("");
    }, 3000);
  }, [message, status, setMessage, setStatus]);

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  if (!userData) {
    navigate("/login");
  }

  return (
    <>
      <section className="flex min-h-screen w-full border bg-[#F8F7FA] lg:gap-12">
        <div className="">
          <Sidebar isOpen={isOpen} handleOpen={handleOpen} />
        </div>

        <main
          className={`w-full  p-4 transition-all duration-500 lg:ml-[268px]`}
        >
          <Navbar handleOpen={handleOpen} />
          <Outlet />
        </main>
      </section>
      <Toaster richColors closeButton />
      <ToasterUI />
    </>
  );
}

export default Layout;
