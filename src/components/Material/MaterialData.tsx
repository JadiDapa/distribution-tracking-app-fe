import { GetMaterials } from "@/lib/network/useMaterial";
import MaterialTable from "./MaterialTable";
import { material } from "@/utils/table/material";
import BarLoader from "react-spinners/BarLoader";

function MaterialData() {
  const { materials, isLoading, isError } = GetMaterials();

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

  return <MaterialTable columns={material} data={materials} />;
}

export default MaterialData;
