import DashboardStatistic from "@/components/Dashboard/DashboardStatistic";
import DataLoading from "@/components/ui/DataLoading";
import { Button } from "@/components/ui/button";
import { GetMaterialInventories } from "@/lib/network/useMaterialInventory";
import { GetRequestByAccountId } from "@/lib/network/useRequest";
import { GetToolInventories } from "@/lib/network/useToolInventory";
import { GetVehiclesByAccountId } from "@/lib/network/useVehicle";
import useAuthStore from "@/lib/store/AuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false);
  const { userData, removeUser } = useAuthStore();
  const { requests, isLoading, isError } = GetRequestByAccountId(
    userData?.id.toString(),
  );
  const { materials } = GetMaterialInventories(userData?.id.toString());
  const { tools } = GetToolInventories(userData?.id.toString());
  const { vehicles } = GetVehiclesByAccountId(userData?.id.toString());

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userData");
    removeUser();
    navigate("/login");
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("firstLog");
    if (isLoggedIn) {
      setShowWelcome(true);
      const deleteFirstLog = () => {
        localStorage.removeItem("firstLog");
        setShowWelcome(false);
      };
      setTimeout(deleteFirstLog, 5000);
    }
  }, []);

  if (isError)
    return (
      <div>
        Something went wrong...
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (requests && materials && tools && vehicles) {
    return (
      <>
        <section className="flex w-full flex-col gap-6 py-6">
          <div className="flex w-full gap-6">
            <div className="box-shadow w-2/6 rounded-md bg-white p-6">
              <p className="text-xl text-primary">
                {" "}
                Welcome!, {userData?.name}
              </p>
              <div className="mt-1 text-slate-500">Have a nice day!</div>
            </div>
            <DashboardStatistic
              requests={requests}
              materials={materials}
              tools={tools}
              vehicles={vehicles}
            />
          </div>
        </section>
      </>
    );
  }
}
