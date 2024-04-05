import { accountColumns } from "@/utils/table/account-column";
import AccountTable from "./AccountTable";
import { GetAccounts } from "@/lib/network/useAccounts";

export default function AccountData() {
  const { data, error } = GetAccounts();

  return (
    <>
      {error && <h1>Something went wrong</h1>}
      {data && <AccountTable columns={accountColumns} data={data} />}
    </>
  );
}
