import { searchSectionList } from "@/utils/static";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";

export default function SectionList() {
  return (
    <div className="flex flex-col px-8 py-4">
      {searchSectionList.map((list) => (
        <Link
          to={list.url}
          className="group pt-2 duration-300 hover:rounded-lg hover:bg-gray-100"
        >
          <DialogTrigger className="flex flex-col items-start">
            <div className="translate-x-2 font-semibold">{list.name}</div>
            <div className="translate-x-2 text-sm text-slate-500">
              {list.url}
            </div>
          </DialogTrigger>
          <hr className="mt-2 group-hover:opacity-0" />
        </Link>
      ))}
    </div>
  );
}
