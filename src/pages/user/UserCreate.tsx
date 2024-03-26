import Header from "@/components/User/Create/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InfoForm from "@/components/User/Create/InfoForm";
import RelationForm from "@/components/User/Create/RelationForm";

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

export default function UserCreate() {
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

  // console.log(form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Header />
          <div className="flex gap-6">
            <InfoForm control={form.control} values={form.getValues()} />
            <RelationForm control={form.control} values={form.getValues()} />
          </div>
        </form>
      </Form>
    </section>
  );
}
