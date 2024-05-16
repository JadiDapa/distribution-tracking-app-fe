/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

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
import { ToolInventories, Tools } from "@/lib/types/tool";
import { Button } from "../ui/button";

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
    <div className="flex flex-col w-full gap-6 p-6 bg-white rounded-md box-shadow">
      <h2 className="text-xl font-medium ">Select Items From your Inventory</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="relative font-medium grow">
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
            <div className="sticky top-0 flex items-center px-4 bg-white border-b">
              <AiOutlineSearch size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Enter item name or code"
                className="p-2 outline-none placeholder:text-gray-700"
              />
            </div>
            {tools?.map((item: Tools, index: number) => {
              const isHaved = toolInventories.filter(
                (tool: ToolInventories) => item.id === tool.toolId,
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
        <div className="flex justify-between gap-4 lg:block">
          <NumberInput value={quantity} onChange={setQuantity} />
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault;
              createRequest();
            }}
            className="flex items-center w-full gap-2 lg:hidden"
          >
            <span>Add</span>
            <Plus />
          </Button>
        </div>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault;
            createRequest();
          }}
          className="items-center hidden gap-2 lg:flex"
        >
          <span>Add</span>
          <Plus />
        </Button>
      </div>

      <RequestedItemTable columns={requestItemsColumn} data={requestedItems} />
    </div>
  );
}
