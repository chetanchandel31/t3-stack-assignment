"use client";

import { useState } from "react";
import CardContainer from "../_components/CardContainer";
import SignUpForm from "./SignUpForm";
import ConfirmOtpForm from "./ConfirmOtpForm";

type Props = {};

export default function SignUp({}: Props) {
  const [otpSentToEmail, setOtpSentToEmail] = useState("");

  return (
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
        </div>
      )}
    </CardContainer>
  );
}
