import MaterialUpdatesTable from "@/components/Material/MaterialUpdatesTable";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetMaterialUpdates } from "@/lib/network/useMaterialUpdates";
import useAuthStore from "@/lib/store/AuthStore";
import { materialUpdates } from "@/utils/table/material-updates";

export default function MaterialUpdates() {
  const { userData } = useAuthStore();
  const { updates, isLoading, isError } = GetMaterialUpdates(
    userData?.id.toString(),
  );

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (updates) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div>
          <SeactionHeader section="Material" subSection="Quantity Updates" />
          <div className="mt-1 text-lg text-primary">
            These are material quantity update histories
          </div>
        </div>
        <MaterialUpdatesTable columns={materialUpdates} data={updates} />
      </section>
    );
  }
}
