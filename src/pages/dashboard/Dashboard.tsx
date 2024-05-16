import DashboardStatistic from "@/components/Dashboard/DashboardStatistic";
import DataLoading from "@/components/ui/DataLoading";
import Graph from "@/components/ui/Graph";

import { Button } from "@/components/ui/button";
import { GetAccountById } from "@/lib/network/useAccounts";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import {
  GetRequestByAccountId,
  GetRequestInboxs,
} from "@/lib/network/useRequest";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { GetVehiclesByAccountId } from "@/lib/network/useVehicle";
import useAuthStore from "@/lib/store/AuthStore";
import { Accounts } from "@/lib/types/account";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { userData, removeUser } = useAuthStore();
  const { account } = GetAccountById(userData?.id.toString());
  const { requests, isLoading, isError } = GetRequestByAccountId(
    userData?.id.toString(),
  );
  const { requests: requestInbox } = GetRequestInboxs(userData?.id.toString());
  const { materials } = GetMaterialInventories(userData?.id.toString());
  const { tools } = GetToolInventories(userData?.id.toString());
  const { vehicles } = GetVehiclesByAccountId(userData?.id.toString());

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userData");
    removeUser();
    navigate("/login");
  }

  if (isError)
    return (
      <div>
        Something went wrong...
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (requests && materials && tools && vehicles && account) {
    return (
      <section className="flex flex-col w-full gap-6 py-6">
        <div className="flex flex-col w-full gap-6 lg:flex-row">
          <div className="p-6 bg-white rounded-md box-shadow lg:w-2/6">
            <p className="text-xl text-primary">Welcome!, {userData?.name}</p>
            <div className="mt-1 text-slate-500">Have a nice day!</div>
          </div>
          <DashboardStatistic
            requests={requests}
            materials={materials}
            tools={tools}
            vehicles={vehicles}
          />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Graph
            requests={requests}
            requestInbox={requestInbox}
            materials={materials}
            tools={tools}
            vehicles={vehicles}
          />
          <div className="box-shadow flex w-full flex-col gap-3 rounded-md bg-white p-6 lg:w-[33%]">
            <h2 className="text-xl font-medium ">Account Relation</h2>
            <div className="flex flex-col gap-3 text-slate-500">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold text-slate-400">
                  HIGHER RELATION :
                </div>
                <Link
                  to={
                    account?.higherAccount
                      ? `/account-detail/${account?.higherAccount?.id}`
                      : "#"
                  }
                  className="font-medium text-[#5748ff]"
                >
                  {account?.higherAccount?.name || "none"}
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold text-slate-400">
                  LOWER RELATION :
                </div>
                {account?.lowerAccounts.length > 0 ? (
                  account.lowerAccounts.map((account: Accounts) => (
                    <Link
                      to={`/account-detail/${account?.id}`}
                      key={account?.id}
                      className="cursor-pointer text-[#d37945]"
                    >
                      {account.name}
                    </Link>
                  ))
                ) : (
                  <div className="font-semibold text-red-500">none</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
