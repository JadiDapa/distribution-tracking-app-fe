import { requestedItemColumns } from "@/utils/table/requested-item-column";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import RequestedItemTable from "./RequestedItemTable";
import { SetStateAction, useEffect, useState } from "react";
import NumberInput from "../ui/NumberInput";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

type RequestedItem = {
  item: string;
  code: string;
  stock: number;
  quantity: number;
};

type Props = {
  requestedItems: RequestedItem[];
  setRequestedItems: React.Dispatch<SetStateAction<RequestedItem[]>>;
};

export default function RequestForm({
  requestedItems,
  setRequestedItems,
}: Props) {
  const [itemList, setItemList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        setItemList(data);
      });
  }, []);

  function createRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newItem = {
      item: selected,
      code: "39824",
      stock: 200,
      quantity: quantity,
    };
    setRequestedItems((prevItems) => [...prevItems, newItem]);
    setSelected("");
    setQuantity(0);
  }

  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Select Requested Items</h2>
      <div className="flex gap-6">
        <div className="relative grow font-medium">
          <div
            onClick={() => setOpen(!open)}
            className={`flex w-full items-center justify-between rounded border bg-white px-4 py-2 ${
              !selected && "text-gray-700"
            }`}
          >
            {selected
              ? selected?.length > 25
                ? selected?.substring(0, 25) + "..."
                : selected
              : "Select Item Name / Code"}
            <BiChevronDown
              size={20}
              className={`transition-all duration-300 ${open && "rotate-180"}`}
            />
          </div>
          <ul
            className={`absolute z-50 w-full overflow-y-auto bg-white transition-all  duration-300  ${
              open ? "mt-2 max-h-60 border" : "max-h-0"
            } `}
          >
            <div className="sticky top-0 flex items-center border-b bg-white px-4">
              <AiOutlineSearch size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Enter item name or code"
                className="p-2 outline-none placeholder:text-gray-700"
              />
            </div>
            {itemList?.map((item: { name: string }) => (
              <li
                key={item.name}
                className={`px-4 py-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              item.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              item.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
                onClick={() => {
                  if (item.name?.toLowerCase() !== selected.toLowerCase()) {
                    setSelected(item.name);
                    setOpen(false);
                    setInputValue("");
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <NumberInput value={quantity} onChange={setQuantity} />
        </div>
        <Button
          onClick={(e) => createRequest(e)}
          className="flex items-center gap-2"
        >
          <span>Add</span>
          <Plus />
        </Button>
      </div>

      <RequestedItemTable
        columns={requestedItemColumns}
        data={requestedItems}
      />
    </div>
  );
}
