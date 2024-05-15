import SeactionHeader from "@/components/ui/SeactionHeader";
import { GetAccountById } from "@/lib/network/useAccounts";
import DataLoading from "@/components/ui/DataLoading";
import { accountColumns } from "@/utils/table/account-column";
import AccountTable from "@/components/User/AccountTable";
import useAuthStore from "@/lib/store/AuthStore";

export default function AccountList() {
  const { userData } = useAuthStore();
  const { account, isError, isLoading } = GetAccountById(
    userData?.id.toString(),
  );

  const higherAccount = account?.higherAccount;
  const lowerAccounts = account?.lowerAccounts;

  const relatedAccounts = [
    ...(higherAccount ? [higherAccount] : []),
    ...(lowerAccounts ? lowerAccounts : []),
  ];

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;
  if (relatedAccounts) {
    return (
      <section className="flex w-full flex-col gap-6 py-6">
        <div className="">
          <SeactionHeader section="Account" subSection="Related Accounts" />
          <div className="mt-1 text-lg text-primary">
            These are accounts that related and can be watched by you
          </div>
        </div>
        <AccountTable columns={accountColumns} data={relatedAccounts} />
      </section>
    );
  }
}
