/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import RelationForm from "@/components/User/RelationForm";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";
import { EditAccount, GetAccountById } from "@/lib/network/useAccounts";
import { useNavigate, useParams } from "react-router-dom";
import useNotificationStore from "@/lib/store/NotificationStore";
import InfoFormEdit from "@/components/User/InfoFormEdit";
import { useState } from "react";

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
    password: z.string().optional(),
    status: z.string(),
    unitId: z.string(),
    higherAccountId: z.string().optional(),
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

export default function AccountEdit() {
  const { editAccount } = EditAccount();
  const { accountId } = useParams();
  const { setStatus, setMessage } = useNotificationStore();
  const [isChangePassword, setIsChangePassword] = useState(false);
  const navigate = useNavigate();

  const { account } = GetAccountById(accountId!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: account?.name,
      user: account?.user,
      status: account?.status,
      unitId: String(account?.unitId),
      higherAccountId: String(account?.higherAccountId),
    },
  });

  function togglePassword() {
    if (isChangePassword) {
      form.setValue("password", undefined);
    }
    setIsChangePassword(!isChangePassword);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editAccount({
        id: Number(accountId),
        name: values.name,
        user: values.user,
        password: values.password,
        status: values.status,
        unitId: Number(values.unitId),
        higherAccountId: values.higherAccountId,
      });

      setStatus("success");
      setMessage(`Account ${values.name} Successfully Updated!`);
      navigate("/account-list");
    } catch (error) {
      setStatus("error");
      setMessage(`Something Went Wrong`);
    }
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <SeactionHeader section="Account" subSection="Edit Account" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CreatePageHeader
            header="Edit an Account"
            subheader="Update an account information as you needed"
          />
          <div className="flex flex-col gap-6 lg:flex-row">
            <InfoFormEdit
              control={form.control}
              values={form.watch()}
              isChangePassword={isChangePassword}
              togglePassword={togglePassword}
            />
            <RelationForm control={form.control} values={form.watch()} />
          </div>
        </form>
      </Form>
    </section>
  );
}
