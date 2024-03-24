import { showedData } from "@/utils/static";
import FilterData from "./FilterData";
import SearchBar from "../ui/SearchBar";
import { Button } from "../ui/button";
import { CirclePlus, Upload } from "lucide-react";

export default function Actions() {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div className="w-28">
          <FilterData placeholder="10" options={showedData} />
        </div>
        <div className="flex gap-4">
          <div className="w-80">
            <SearchBar bordered placeholder="Search User" />
          </div>
          <Button
            variant="muted"
            icon={<Upload size={20} strokeWidth={2.25} />}
          >
            Export
          </Button>
          <Button
            variant="default"
            icon={<CirclePlus size={20} strokeWidth={2.25} />}
          >
            Add New User
          </Button>
        </div>
      </div>
    </div>
  );
}
