import MaterialTable from "./MaterialTable";
import { material } from "@/utils/table/material";
import { Materials } from "@/lib/types/material";
import DataLoading from "../ui/DataLoading";

type Props = {
  materials: Materials[];
  isLoading?: boolean;
  isError?: boolean;
};

function MaterialData({ materials, isLoading, isError }: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <MaterialTable columns={material} data={materials} />;
}

export default MaterialData;
