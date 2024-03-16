"use client";

import { useState } from "react";
import CardContainer from "../_components/CardContainer";
import SignUpForm from "./SignUpForm";
import ConfirmOtpForm from "./ConfirmOtpForm";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import AuthScreen from "../providers/AuthProvider/jsx/AuthScreen";

type Props = {};

export default function SignUp({}: Props) {
  const [otpSentToEmail, setOtpSentToEmail] = useState("");

  return (
    <AuthScreen>
      <CardContainer>
        {otpSentToEmail ? (
          <ConfirmOtpForm
            otpSentToEmail={otpSentToEmail}
            setOtpSentToEmail={setOtpSentToEmail}
          />
        ) : (
          <div className="flex flex-col items-stretch gap-12">
            <div className="text-center text-3xl font-semibold">
              Create your account
            </div>

            <SignUpForm setOtpSentToEmail={setOtpSentToEmail} />

            <div className="flex items-center justify-center">
              Have an account?{" "}
              <Button asChild size={"sm"} variant={"link"}>
                <Link href={"/logIn"}>Login</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContainer>
    </AuthScreen>
  );
}
