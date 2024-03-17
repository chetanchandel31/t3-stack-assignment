"use client";

import { type TypeSetStateFunction } from "~/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { config } from "~/config";
import React from "react";
import getCensoredEmail from "./helpers/getCensoredEmail";
import { Button } from "~/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "~/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  setOtpSentToEmail: TypeSetStateFunction<string>;
  otpSentToEmail: string;
};

const FormSchema = z.object({
  pin: z.string().min(config.otpLength, {
    message: `Your one-time password must be ${config.otpLength} characters.`,
  }),
});

export default function ConfirmOtpForm({
  otpSentToEmail,
  setOtpSentToEmail,
}: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const authConfirmOtp = api.auth.confirmOtp.useMutation({});

  const isLoading = authConfirmOtp.isPending;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isLoading) return;

    const confirmOtpResult = await authConfirmOtp.mutateAsync({
      email: otpSentToEmail,
      otp: data.pin,
    });

    router.push("/logIn");

    toast({
      title: "Sign up successful",
      description: (
        <div>
          You can now log in with <strong>{confirmOtpResult.email}</strong>
        </div>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch gap-12"
      >
        <div className="text-center text-3xl font-semibold">
          Verify your email
        </div>

        <div className="text-md text-center ">
          Enter the {config.otpLength} digit OTP you have received on{" "}
          <strong>{getCensoredEmail(otpSentToEmail)}</strong>
        </div>

        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={config.otpLength}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, index) => (
                          <React.Fragment key={index}>
                            <InputOTPSlot
                              className="rounded-md border"
                              {...slot}
                            />
                          </React.Fragment>
                        ))}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button className="mb-6 w-full" disabled={isLoading} type="submit">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            VERIFY
          </Button>

          <Button
            type="button"
            className="w-full"
            onClick={() => {
              setOtpSentToEmail("");
            }}
            variant={"outline"}
          >
            <ReloadIcon className="mr-2 h-4 w-4 " />
            Retry
          </Button>
        </div>
      </form>
    </Form>
  );
}
