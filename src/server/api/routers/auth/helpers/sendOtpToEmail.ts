import { TRPCError } from "@trpc/server";
import nodemailer from "nodemailer";
import { env } from "~/env";

type Params = { otp: string; emailAddress: string };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chetanchandel3@gmail.com",
    pass: env.NODEMAILER_PASSWORD,
  },
});

export default async function sendOtpToEmail({ emailAddress, otp }: Params) {
  try {
    const mailOptions = {
      from: "chetanchandel3@gmail.com",
      to: emailAddress,
      subject: "E-commerce OTP",
      text: `Your OTP for registration on e-commerce is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send OTP via email",
    });
  }
}
