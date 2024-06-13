import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import RequestedItemTable from "./RequestedItemTable";
import { useState } from "react";
import NumberInput from "../ui/NumberInput";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import { requestItemsColumn } from "@/utils/table/request-items";

type Props = {
  displayedItems?: {
    id: number;
    material?: {
      name: string;
      sku: string;
    };
    tool?: {
      name: string;
      sku: string;
    };
    category: string;
    quantity: number;
  }[];
};

export default function RequestFormEdit({ displayedItems }: Props) {
  const { requestedItems, addItem } = useRequestItemStore();
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [selectedStock, setSelectedStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  function createRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (selected && quantity >= 1) {
      const newItem = {
        materialId: selectedId,
        id: selectedId,
        name: selected,
        sku: selectedCode,
        stock: selectedStock,
        quantity: quantity,
      };
      addItem(newItem);
      setSelected("");
      setSelectedStock(0);
      setQuantity(1);
    }
  }

  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Select Items From your Inventory</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="relative grow font-medium">
          <div
            onClick={() => setOpen(!open)}
            className={`flex w-full items-center justify-between rounded border bg-white px-4 py-2 ${
              !selected && "text-gray-700"
            }`}
          >
            {selected ? selected : "Select Item Name / Code"}
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
            {displayedItems?.map((item, index: number) => {
              const itemName =
                item.material?.name ?? item.tool?.name ?? "Unnamed";
              const itemSku = item.material?.sku ?? item.tool?.sku ?? "No SKU";
              return (
                <li
                  key={index}
                  className={`group px-4 py-2 text-sm hover:bg-sky-600 hover:text-white
                ${
                  (itemName?.toLowerCase() === selected?.toLowerCase() ||
                    itemSku?.toLowerCase() === selected?.toLowerCase()) &&
                  "bg-sky-600 text-white"
                }
                ${
                  itemName?.toLowerCase().startsWith(inputValue) ||
                  itemSku?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                  onClick={() => {
                    if (
                      itemSku?.toLowerCase() !== selected?.toLowerCase() &&
                      itemName?.toLowerCase() !== selected?.toLowerCase()
                    ) {
                      setSelected(itemName);
                      setSelectedCode(itemSku);
                      setSelectedId(item.id);
                      setSelectedStock(item.quantity);
                      setOpen(false);
                      setInputValue("");
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <span className="text-primary group-hover:text-white">
                      {itemSku}
                    </span>
                    <span>{itemName}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between gap-4 lg:block">
          <NumberInput value={quantity} onChange={setQuantity} />
          <Button
            onClick={(e) => {
              e.preventDefault();
              createRequest(e);
            }}
            className="flex w-full items-center gap-2 lg:hidden"
          >
            <span>Add</span>
            <Plus />
          </Button>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            createRequest(e);
          }}
          className="hidden items-center gap-2 lg:flex"
        >
          <span>Add</span>
          <Plus />
        </Button>
      </div>

      <RequestedItemTable columns={requestItemsColumn} data={requestedItems} />
    </div>
  );
}
