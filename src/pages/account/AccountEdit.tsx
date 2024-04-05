import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InfoForm from "@/components/User/InfoForm";
import RelationForm from "@/components/User/RelationForm";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { EditAccount, GetAccountById } from "@/lib/network/useAccounts";
import { useNavigate, useParams } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";

const formSchema = z
  .object({
    name: z
      .string()
      .min(4, {
        message: "Account Name must be atleast 4 characters long!",
      })
      .max(50, {
        message: "Account Name must be lower than 50 characters long!",
      }),
    user: z
      .string()
      .min(4, {
        message: "Account User must be atleast 4 characters long!",
      })
      .max(50, {
        message: "Account User must be lower than 50 characters long!",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be atleast 8 characters long!",
      })
      .max(50, {
        message: "Password must be lower than 50 characters long!",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be atleast 8 characters long!",
      })
      .max(50, {
        message: "Password must be lower than 50 characters long!",
      }),
    status: z.string(),
    unitId: z.string(),
    relation: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.unitId === "3" && !data.relation) {
        return false;
      }
      return true;
    },
    {
      message: "Relation is required for unit 'Posko'",
      path: ["relation"],
    },
  );

export default function AccountEdit() {
  const { editAccount } = EditAccount();
  const { accountId } = useParams();
  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();

  const { data } = GetAccountById(accountId!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: data.name,
      user: data.user,
      password: data.password,
      confirmPassword: data.password,
      status: data.status,
      unitId: data.unitId,
      relation: data.relation,
    },
  });

  console.log(form.watch());

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editAccount(values);
    setStatus("success");
    setMessage(`Account ${values.name} Successfully Modified!`);
    return navigate("/account-list");
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Account" subSection="Add Account" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Add New Account"
            subheader="Add new account to use accross the app"
          />
          <div className="flex gap-6">
            <InfoForm control={form.control} values={form.watch()} />
            <RelationForm control={form.control} values={form.watch()} />
          </div>
        </form>
      </Form>
    </section>
  );
}
