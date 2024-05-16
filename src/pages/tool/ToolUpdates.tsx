import ToolUpdatesTable from "@/components/Tools/ToolUpdatesTable";
import DataLoading from "@/components/ui/DataLoading";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetToolUpdates } from "@/lib/network/useToolUpdates";
import useAuthStore from "@/lib/store/AuthStore";
import { toolUpdates } from "@/utils/table/tool-updates";

export default function ToolUpdates() {
  const { userData } = useAuthStore();
  const { updates, isLoading, isError } = GetToolUpdates(
    userData?.id.toString(),
  );

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (updates) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div>
          <SeactionHeader section="Tool" subSection="Quantity Updates" />
          <div className="mt-1 text-lg text-primary">
            These are tool quantity update histories
          </div>
        </div>
        <ToolUpdatesTable columns={toolUpdates} data={updates} />
      </section>
    );
  }
}
