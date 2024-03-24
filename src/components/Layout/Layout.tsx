import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useState } from "react";
import Navbar from "../ui/Navbar";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="flex w-full gap-12 border bg-[#F8F7FA]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`${isOpen ? "ml-[290px]" : "ml-[82px]"}  w-full p-6 transition-all duration-500`}
      >
        <Navbar />
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
