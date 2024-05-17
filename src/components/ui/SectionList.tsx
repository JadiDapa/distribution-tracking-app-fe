import { Link } from "react-router-dom";
import { DialogTrigger } from "./dialog";

type Props = {
  section?: {
    name: string;
    url: string;
  }[];
};

export default function SectionList({ section }: Props) {
  return (
    <div className="flex h-72 flex-col overflow-y-scroll px-8 py-4">
      {section?.map((list) => (
        <Link
          to={list.url}
          className="group pt-2 duration-300 hover:rounded-lg hover:bg-gray-100"
        >
          <DialogTrigger className="flex flex-col items-start ">
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
