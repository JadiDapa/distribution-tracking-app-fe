import BarLoader from "react-spinners/BarLoader";
import MaterialInventoryTable from "./MaterialInventoryTable";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import { materialInventory } from "@/utils/table/material-inventory";
import useAuthStore from "@/lib/store/AuthStore";

export default function MaterialInventoryData() {
  const { userData } = useAuthStore();
  const { materialInventories, isLoading, isError } = GetMaterialInventories(
    userData?.id.toString(),
  );

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading)
    return (
      <div className="mx-auto w-full flex-col gap-8">
        <p>Loading Your Data</p>
        <BarLoader
          color={"blue"}
          loading={isLoading}
          width={400}
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <MaterialInventoryTable
      columns={materialInventory}
      data={materialInventories}
    />
  );
}
