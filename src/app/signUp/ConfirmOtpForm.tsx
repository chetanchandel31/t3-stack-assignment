"use client";

import { type TypeSetStateFunction } from "~/types";

type Props = {
  setOtpSentToEmail: TypeSetStateFunction<string>;
  otpSentToEmail: string;
};

export default function ConfirmOtpForm({
  otpSentToEmail,
  setOtpSentToEmail,
}: Props) {
  return <div>{otpSentToEmail}</div>;
}
