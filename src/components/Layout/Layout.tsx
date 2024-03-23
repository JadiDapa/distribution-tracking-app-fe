import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useState } from "react";

function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="flex gap-12">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className={`${isOpen ? "ml-[312px]" : "ml-[100px]"}`}>
        <Outlet />
      </main>
    </section>
  );
}

export default Layout;
