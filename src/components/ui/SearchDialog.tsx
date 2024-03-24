import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import SectionList from "./SectionList";

export default function SearchDialog() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full duration-300 hover:bg-gray-200 ">
        <Search strokeWidth={1.5} size={24} />
      </div>
      <Dialog>
        <DialogTrigger className="text-lg text-gray-400">Search</DialogTrigger>
        <DialogContent className="flex w-[660px] flex-col px-0 pb-0 pt-4">
          <SearchBar />
          <hr />
          <SectionList />
        </DialogContent>
      </Dialog>
    </div>
  );
}
