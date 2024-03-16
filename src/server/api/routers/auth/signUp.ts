import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import generateSixDigitOtp from "./helpers/generateSixDigitOtp";
import getEncryptedPassword from "./helpers/getEncryptedPassword";
import sendOtpToEmail from "./helpers/sendOtpToEmail";

type TypeSignUpResponse = {
  name: string;
  email: string;
};

export const signUp = publicProcedure
  .input(
    z.object({
      name: z
        .string({ required_error: "Name is required." })
        .min(3, { message: "Name should be of 3 characters atleast." }),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
      password: z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password should be of 8 characters atleast." }),
    }),
  )
  .mutation(async ({ ctx, input }): Promise<TypeSignUpResponse> => {
    const existingUser = await ctx.db.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser && existingUser.isEmailVerified) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists, please sign in",
      });
    }

    const salt = uuid();
    const encryptedPassword = getEncryptedPassword({
      plainPassword: input.password,
      salt,
    });
    const latestOtpSent = generateSixDigitOtp();

    await sendOtpToEmail({ emailAddress: input.email, otp: latestOtpSent });

    const createdUser = await ctx.db.user.create({
      data: {
        email: input.email,
        name: input.name,

        salt,
        encryptedPassword,

        isEmailVerified: false,
        latestOtpSentAt: new Date(),
        latestOtpSent,
      },
    });

    return { name: createdUser.name, email: createdUser.email };
  });
