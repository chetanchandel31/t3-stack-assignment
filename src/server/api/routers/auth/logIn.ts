import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import getEncryptedPassword from "./helpers/getEncryptedPassword";
import { generateAuthToken } from "./helpers/authToken";

type TypeSignInResponse = {
  name: string;
  userId: string;
  email: string;
  authToken: string;
  authTokenExpiresAtMs: number;
};

export const logIn = publicProcedure
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
        message: "Invalid credentials",
      });
    }

    const { authToken, authTokenExpiresAtMs } = generateAuthToken({
      userId: existingUser.userId,
    });

    return {
      authToken,
      authTokenExpiresAtMs,
      name: existingUser.name,
      userId: existingUser.userId,
      email: existingUser.email,
    };
  });
