import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RequestControl } from "@/lib/types/request";
import { GetAccountById } from "@/lib/network/useAccounts";
import useAuthStore from "@/lib/store/AuthStore";
import { Accounts } from "@/lib/types/account";
import DataLoading from "../ui/DataLoading";

type Props = {
  control: RequestControl;
};

export default function InfoForm({ control }: Props) {
  const { userData } = useAuthStore();
  const { account, isError, isLoading } = GetAccountById(
    userData?.id.toString(),
  );

  const higherAccount = account?.higherAccount;

  if (isError) return <div>Something went wrong...</div>;
  if (isLoading) return <DataLoading isLoading={isLoading} />;

  if (account) {
    return (
      <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6">
        <h2 className="text-xl font-medium ">Request Information</h2>
        <div className="flex flex-col gap-6 lg:flex-row">
          <FormField
            control={control}
            name="reason"
            render={({ field }) => (
              <FormItem className="grow-[2]">
                <FormLabel>Request reason</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className=""
                    placeholder="Provide short reason for your request"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="requestedId"
            render={({ field }) => (
              <FormItem className="grow-[1]">
                <FormLabel>Requested Account</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select requested account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {higherAccount && (
                      <SelectItem value={higherAccount.id.toString() as string}>
                        {higherAccount.name}
                      </SelectItem>
                    )}
                    {account.lowerAccounts.map((accounts: Accounts) => (
                      <SelectItem
                        key={accounts.id}
                        value={accounts.id?.toString() as string}
                      >
                        {accounts.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }
}
