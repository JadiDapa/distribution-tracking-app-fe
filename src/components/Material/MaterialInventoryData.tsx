import BarLoader from "react-spinners/BarLoader";
import MaterialInventoryTable from "./MaterialInventoryTable";
import { materialInventory } from "@/utils/table/material-inventory";

type Props = {
  materials: [];
  isError?: boolean;
  isLoading?: boolean;
};

export default function MaterialInventoryData({
  materials,
  isError,
  isLoading,
}: Props) {
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
    <MaterialInventoryTable columns={materialInventory} data={materials} />
  );
}
