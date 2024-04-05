import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import useAuthStore from "@/lib/store/AuthStore";
import { Toaster, toast } from "sonner";
import useNotificationStore from "@/lib/store/NotificationStore";

function Layout() {
  const { token } = useAuthStore();
  const { status, message, setStatus, setMessage } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(true);
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

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <section className="flex min-h-screen w-full gap-12 border bg-[#F8F7FA]">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={`${isOpen ? "ml-[268px]" : "ml-[92px]"}  w-full p-4 transition-all duration-500`}
        >
          <Navbar />
          <Outlet />
        </main>
      </section>
      <Toaster richColors closeButton />
    </>
  );
}

export default Layout;
