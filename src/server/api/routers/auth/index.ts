import { z } from "zod";
import { v4 as uuid } from "uuid";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import getEncryptedPassword from "./helpers/getEncryptedPassword";
import generateSixDigitOtp from "./helpers/generateSixDigitOtp";
import { TRPCError } from "@trpc/server";
import sendOtpToEmail from "./helpers/sendOtpToEmail";

// TODO: verifyEmail

type TypeSignInResponse = {
  name: string;
  userId: string;
  authToken: string;
  authTokenExpiresAtMs: number;
};

type TypeSignUpResponse = {
  name: string;
  email: string;
};

export const authRouter = createTRPCRouter({
  logIn: publicProcedure
    .input(
      z.object({
        email: z
          .string({ required_error: "Email is required" })
          .email({ message: "Invalid email" }),
        password: z
          .string({ required_error: "Password is required." })
          .min(8, { message: "Password should be of 8 characters atleast." }),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<TypeSignInResponse> => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      const isCorrectPassword =
        existingUser?.encryptedPassword ===
        getEncryptedPassword({
          salt: existingUser?.salt ?? "",
          plainPassword: input.password,
        });

      if (
        existingUser?.isEmailVerified !== true ||
        existingUser.email !== input.email ||
        !isCorrectPassword
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists, please sign in",
        });
      }

      // TODO: generate and send auth token

      return { authToken: "", authTokenExpiresAtMs: 0, name: "", userId: "" };
    }),

  signUp: publicProcedure
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
    }),
});
