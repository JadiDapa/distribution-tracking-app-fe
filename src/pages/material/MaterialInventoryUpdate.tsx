import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import useAuthStore from "@/lib/store/AuthStore";
import useRequestItemStore from "@/lib/store/RequestItemStore";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import MaterialQuantityUpdater from "@/components/Request/MaterialQuantityUpdater";
import { UpdateMaterialInvetory } from "@/lib/network/useMaterialInventory";

const formSchema = z.object({
  reason: z
    .string()
    .min(5, { message: "Fill the request reason at least 5 character" }),
  note: z.string().optional(),
});

export default function MaterialInventoryUpdate() {
  const { requestedItems, clearItem } = useRequestItemStore();
  const { userData } = useAuthStore();
  const { updateInventory } = UpdateMaterialInvetory();

  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      note: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const consumptionError = requestedItems.filter(
      (item) => item.stock < item.quantity * -1,
    );
    if (consumptionError.length > 0) {
      setStatus("error");
      setMessage("Can't consuming item larger than your current stock");
      return;
    }

    try {
      await updateInventory({
        accountId: Number(userData?.id),
        reason: values.reason,
        items: requestedItems,
        note: values.note,
      });

      setStatus("success");
      setMessage("Account Successfully Created!");
      clearItem();
      navigate("/material-inventory");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong!");
      console.log(error);
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Modify" subSection="Material Quantity" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Updating Quantity Based on Recent Stocks"
            subheader="modify your material quantity whenever you consuming or restocking your material"
          />
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
                <h2 className="text-xl font-medium ">Updating information</h2>
                <div className="flex flex-col gap-6 ">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem className="grow-[2]">
                        <FormLabel>Updating reason</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className=""
                            placeholder="Provide short reason for your update"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="h-48">
                          <FormLabel>Note / Detail</FormLabel>
                          <FormControl className="h-28">
                            <ReactQuill theme="snow" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="box-shadow relative flex w-1/2 flex-col gap-6 rounded-md bg-white p-6">
                <h2 className="text-xl font-medium ">Summary</h2>
                <ul className="divide-y">
                  <li className="flex justify-between py-2.5">
                    <span>MODIFY : </span>
                    <span className="font-semibold">Material</span>
                  </li>
                  <li className="flex justify-between py-2.5">
                    <span>ITEM COUNT :</span>
                    <span className="font-semibold">
                      {requestedItems.length}
                    </span>
                  </li>
                  <li className="flex justify-between py-2.5">
                    <span>TOTAL QTY :</span>
                    <span className="font-semibold">
                      {requestedItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0,
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <MaterialQuantityUpdater />
          </div>
        </form>
      </Form>
    </section>
  );
}
