import { categoryFilter, statusFilter } from "@/utils/static";
import FilterData from "./FilterData";

export default function UserFilter() {
  return (
    <div className="p-6">
      <div className="text-xl">Filters</div>
      <div className="mt-4 grid grid-cols-3 gap-6">
        <FilterData placeholder="Select Category" options={categoryFilter} />

        <FilterData placeholder="Select Status" options={statusFilter} />
      </div>
    </div>
  );
}
