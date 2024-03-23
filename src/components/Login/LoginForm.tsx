import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PiUserLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";

const formSchema = z.object({
  username: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export default function LoginForm() {
  const [isShow, setIsShow] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-lg font-medium">Username</FormLabel>
              <div className="relative">
                <PiUserLight className="absolute left-2.5 top-2.5 text-xl" />
                <FormControl>
                  <Input
                    placeholder="masukkan username anda"
                    {...field}
                    className="mt-1 w-full rounded-md border-slate-300 px-10 py-5 text-lg focus:outline-primary"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <CiLock className="absolute left-2.5 top-2.5 text-xl" />
                <FormControl className="text-lg font-medium">
                  <Input
                    placeholder="masukkan password yang sesuai"
                    type={isShow ? "text" : "password"}
                    {...field}
                    className="mt-1 w-full rounded-md border-slate-300 px-10 py-5 text-lg focus:outline-primary"
                  />
                </FormControl>
                <div
                  onClick={() => setIsShow(!isShow)}
                  className="absolute right-2.5 top-2.5 text-xl"
                >
                  {isShow ? <BsEyeSlash /> : <AiOutlineEye />}
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <label htmlFor="remember" className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 shadow-sm"
              name="remember"
            />
            <span className="ms-2 text-gray-600">Remember me</span>
          </label>

          <a
            href="#"
            className="rounded-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Forgot your password?
          </a>
        </div>

        <button
          type="submit"
          className="flex justify-center rounded-full border border-transparent bg-primary py-2 font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 active:bg-gray-900"
        >
          Login
        </button>
      </form>
    </Form>
  );
}
