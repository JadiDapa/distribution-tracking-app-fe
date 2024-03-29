import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InfoForm from "@/components/User/InfoForm";
import RelationForm from "@/components/User/RelationForm";
import CreatePageHeader from "@/components/ui/CreatePageHeader";
import SeactionHeader from "@/components/ui/SeactionHeader";

const formSchema = z
  .object({
    account: z.string().min(8).max(24),
    user: z.string().min(8).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8),
    status: z.enum(["Active", "Inactive"]),
    category: z.enum(["Unit Pelaksana", "Unit Layanan", "Posko"]),
    relation: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.category === "Posko" && !data.relation) {
        return false;
      }
      return true;
    },
    {
      message: "Relation is required for category 'Posko'",
      path: ["relation"],
    },
  );

export default function AccountAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      user: "",
      password: "",
      confirmPassword: "",
      status: undefined,
      category: undefined,
      relation: "",
    },
  });

  console.log(form.watch());

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
