import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const searchSchema = z.object({
  searchValue: z.string(),
});

export default function SearchBar() {
  const search = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchValue: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
  }
  return (
    <div className="flex gap-2 px-4">
      <div className="flex items-center justify-center rounded-full duration-300 hover:bg-gray-200 ">
        <Search strokeWidth={1.5} size={24} />
      </div>
      <Form {...search}>
        <form onSubmit={search.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={search.control}
            name="searchValue"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoFocus
                    {...field}
                    className="border-none focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
