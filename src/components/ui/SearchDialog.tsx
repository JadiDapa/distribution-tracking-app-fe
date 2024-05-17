import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import SectionList from "./SectionList";
import { SetStateAction, useState } from "react";
import { Input } from "./input";

export default function SearchDialog() {
  const [search, setSearch] = useState("");
  const [pages] = useState([
    {
      name: "Dashboard",
      url: "/",
    },
    {
      name: "Account Relation",
      url: "/account-related",
    },
    {
      name: "Request Sent",
      url: "/request-list",
    },
    {
      name: "Request Inbox",
      url: "/request-inbox",
    },
    {
      name: "Material Inventory",
      url: "/material-inventory",
    },
    {
      name: "Tool Inventory",
      url: "/tool-inventory",
    },
    {
      name: "Available Vehicle",
      url: "/available-inventory",
    },
  ]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const filteredSection = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full duration-300 hover:bg-gray-200 ">
        <Search strokeWidth={1.5} size={24} />
      </div>
      <Dialog>
        <DialogTrigger className="text-lg text-gray-400">Search</DialogTrigger>
        <DialogContent className="flex flex-col px-0 pb-0 pt-4 lg:w-[660px]">
          <div className="relative w-80 pl-8">
            <Search className="absolute left-10 top-1.5 text-sm text-slate-400" />
            <Input
              type="text"
              placeholder="Search a page"
              value={search}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
          <hr />
          <SectionList section={filteredSection} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
