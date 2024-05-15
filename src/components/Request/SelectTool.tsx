import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import RequestedItemTable from "./RequestedItemTable";
import { useEffect, useState } from "react";
import NumberInput from "../ui/NumberInput";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import useAuthStore from "@/lib/store/AuthStore";
import { GetTools } from "@/lib/network/useTool";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { requestItemsColumn } from "@/utils/table/request-items";
import { ToolInventories } from "@/lib/types/tool";

export default function SelectTool() {
  const { userData } = useAuthStore();
  const { requestedItems, addItem, clearItem } = useRequestItemStore();
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { tools } = GetTools();
  const { tools: items } = GetToolInventories(userData?.id.toString());

  useEffect(() => {
    return () => {
      clearItem();
    };
  }, [clearItem]);

  function createRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const getStock = items.find(
      (request: ToolInventories) => request.tool.sku === selectedCode,
    );

    if (selected && quantity >= 1) {
      const newItem = {
        id: selectedId,
        name: selected,
        sku: selectedCode,
        stock: getStock ? getStock.quantity : 0,
        quantity: quantity,
      };
      addItem(newItem);
      setSelected("");
      setQuantity(1);
    }
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
            {tools?.map(
              (item: {
                name: string;
                sku: string;
                id: number;
                quantity: number;
              }) => (
                <li
                  key={item.name}
                  className={`group px-4 py-2 text-sm hover:bg-sky-600 hover:text-white
                ${
                  (item.name?.toLowerCase() === selected?.toLowerCase() ||
                    item.sku?.toLowerCase() === selected?.toLowerCase()) &&
                  "bg-sky-600 text-white"
                }
                ${
                  item.name?.toLowerCase().startsWith(inputValue) ||
                  item.sku?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                  onClick={() => {
                    if (
                      item.sku?.toLowerCase() !== selected?.toLowerCase() &&
                      item.name?.toLowerCase() !== selected?.toLowerCase()
                    ) {
                      setSelected(item.name);
                      setSelectedCode(item.sku);
                      setSelectedId(item.id);
                      setOpen(false);
                      setInputValue("");
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <span className="text-primary group-hover:text-white">
                      {item.sku}
                    </span>
                    <span>{item.name}</span>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <NumberInput value={quantity} onChange={setQuantity} />
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault;
            createRequest(e);
          }}
          className="flex items-center gap-2"
        >
          <span>Add</span>
          <Plus />
        </Button>
      </div>

      <RequestedItemTable columns={requestItemsColumn} data={requestedItems} />
    </div>
  );
}
