import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InfoForm from "@/components/User/InfoForm";
import RelationForm from "@/components/User/RelationForm";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { CreateAccount } from "@/lib/network/useAccounts";
import { useNavigate } from "react-router-dom";
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
    higherAccountId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.unitId === "3" && !data.higherAccountId) {
        return false;
      }
      return true;
    },
    {
      message: "Relation is required for unit 'Posko'",
      path: ["relation"],
    },
  );

export default function AccountAdd() {
  const { postAccount, error } = CreateAccount();
  const navigate = useNavigate();
  const { setStatus, setMessage } = useNotificationStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      user: "",
      password: "",
      confirmPassword: "",
      status: "active",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postAccount({
        name: values.name,
        user: values.user,
        password: values.password,
        status: values.status,
        unitId: Number(values.unitId),
        higherAccountId: Number(values.higherAccountId),
      });
      if (!error) {
        setStatus("success");
        setMessage("Account Successfully Created!");
        navigate("/account-list");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something Went Wrong!");
    }
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
          <div className="flex flex-col gap-6 lg:flex-row">
            <InfoForm control={form.control} values={form.watch()} />
            <RelationForm control={form.control} values={form.watch()} />
          </div>
        </form>
      </Form>
    </section>
  );
}
