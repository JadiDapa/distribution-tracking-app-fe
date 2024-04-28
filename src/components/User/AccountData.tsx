import { accountColumns } from "@/utils/table/account-column";
import AccountTable from "./AccountTable";
import { GetAccounts } from "@/lib/network/useAccounts";
import BarLoader from "react-spinners/BarLoader";

export default function AccountData() {
  const { accounts, isError, isLoading } = GetAccounts();

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

  return <AccountTable columns={accountColumns} data={accounts} />;
}
