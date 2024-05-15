import RequestedItemTable from "./RequestedItemTable";
import NumberInput from "../ui/NumberInput";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import useAuthStore from "@/lib/store/AuthStore";
import { Plus } from "lucide-react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { requestItemsColumn } from "@/utils/table/request-items";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { GetTools } from "@/lib/network/useTool";

export default function ToolQuantityUpdater() {
  const { requestedItems, addItem, updateQuantity } = useRequestItemStore();
  const { userData } = useAuthStore();
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    toolId: 0,
    name: "",
    sku: "",
    stock: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { tools: toolInventories } = GetToolInventories(
    userData?.id.toString(),
  );

  const { tools } = GetTools();

  function createRequest() {
    const isExist = requestedItems.findIndex(
      (item) => item.toolId === selectedItem.toolId,
    );

    if (selectedItem.name && quantity !== 0) {
      if (isExist !== -1) {
        updateQuantity(isExist, requestedItems[isExist].quantity + quantity);
      } else {
        addItem({ ...selectedItem, quantity: quantity });
      }
      setSelectedItem({
        toolId: 0,
        name: "",
        sku: "",
        stock: 0,
      });
      setQuantity(1);
    }
  }

  return (
    <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Select Items From your Inventory</h2>
      <div className="flex gap-6">
        <div className="relative grow font-medium">
          <div
            onClick={() => setOpen(!open)}
            className={`flex w-full items-center justify-between rounded border bg-white px-4 py-2 ${
              !selectedItem.name && "text-gray-700"
            }`}
          >
            {selectedItem.name ? selectedItem.name : "Select Item Name / Code"}
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
            {tools?.map((item, index) => {
              const isHaved = toolInventories.filter(
                (tool) => item.id === tool.toolId,
              );

              const isMatch =
                item.name?.toLowerCase() === selectedItem.name?.toLowerCase() ||
                item.sku?.toLowerCase() === selectedItem.name?.toLowerCase();
              const isStartMatch =
                item.name?.toLowerCase().startsWith(inputValue) ||
                item.sku?.toLowerCase().startsWith(inputValue);
              return (
                <li
                  key={index}
                  className={`group px-4 py-2 text-sm hover:bg-sky-600 hover:text-white
                ${isMatch && "bg-sky-600 text-white"}
                ${isStartMatch ? "block" : "hidden"}`}
                  onClick={() => {
                    if (!isMatch) {
                      const selectedItem = {
                        toolId: item.id,
                        name: item.name,
                        sku: item.sku,
                      };

                      if (isHaved[0]?.quantity) {
                        setSelectedItem({
                          stock: isHaved[0]?.quantity,
                          ...selectedItem,
                        });
                      } else {
                        setSelectedItem({
                          stock: 0,
                          ...selectedItem,
                        });
                      }

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
              );
            })}
          </ul>
        </div>
        <div>
          <NumberInput value={quantity} onChange={setQuantity} />
        </div>
        <div
          onClick={createRequest}
          className="flex items-center gap-2 rounded-md bg-green-500 px-4 text-white"
        >
          <span>Add</span>
          <Plus />
        </div>
      </div>

      <RequestedItemTable columns={requestItemsColumn} data={requestedItems} />
    </div>
  );
}
