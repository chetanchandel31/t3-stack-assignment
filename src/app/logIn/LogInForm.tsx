"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/trpc/react";
import { useAuth } from "../providers/AuthProvider";

type Props = {};

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password should be of 8 characters atleast." }),
});

export default function LogInForm({}: Props) {
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const authLogIn = api.auth.logIn.useMutation({});

  const isLoading = authLogIn.isPending;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return;

    const logInResult = await authLogIn.mutateAsync(values);

    auth.setAuthorizedUser({
      authToken: logInResult.authToken,
      authTokenExpiresAt: logInResult.authTokenExpiresAtMs / 1000,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-stretch gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johndoe@gmail.com"
                  type="email"
                />
              </FormControl>

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
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            LOGIN
          </Button>
        </div>
      </form>
    </Form>
  );
}
