import { accountColumns } from "@/utils/table/account-column";
import AccountTable from "./AccountTable";
import { Accounts } from "@/lib/types/account";
import DataLoading from "../ui/DataLoading";

type Props = {
  accounts: Accounts[];
  isError?: boolean;
  isLoading?: boolean;
};

export default function RelatedAccount({
  accounts,
  isError,
  isLoading,
}: Props) {
  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  return <AccountTable columns={accountColumns} data={accounts} />;
}
