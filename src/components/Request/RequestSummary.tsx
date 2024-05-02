import { Requests } from "@/lib/types/request";
import { Button } from "../ui/button";
import useAuthStore from "@/lib/store/AuthStore";
import { RequestedItems } from "@/lib/types/requestItem";

type Props = {
  values: Requests;
  requestedItems: RequestedItems[];
};

export default function RequestSummary({ values, requestedItems }: Props) {
  const { userData } = useAuthStore();
  return (
    <div className="box-shadow relative flex w-1/2 flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Summary</h2>
      <ul className="divide-y">
        <li className="flex justify-between py-2.5">
          <span>REQUESTER : </span>
          <span className="font-semibold">{userData?.name}</span>
        </li>
        <li className="flex justify-between py-2.5">
          <span>REQUESTED : </span>
          <span className="font-semibold">{values.requestedId}</span>
        </li>
        <li className="flex justify-between py-2.5">
          <span>ITEM TYPE COUNT :</span>
          <span className="font-semibold">{requestedItems.length}</span>
        </li>
        <li className="flex justify-between py-2.5">
          <span>TOTAL QTY :</span>
          <span className="font-semibold">
            {requestedItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </li>
      </ul>
      <div className="absolute bottom-4 right-4">
        <Button type="submit">Send the Request</Button>
      </div>
    </div>
  );
}
