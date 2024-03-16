import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { config } from "~/config";

type TypeResponse = { name: string; email: string; isEmailVerified: boolean };

export const confirmOtp = publicProcedure
  .input(
    z.object({
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
      otp: z.string({ required_error: "OTP is required" }).min(6).max(6),
    }),
  )
  .mutation(async ({ input, ctx }): Promise<TypeResponse> => {
    const existingUser = await ctx.db.user.findUnique({
      where: { email: input.email },
    });

    if (!existingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email not found, please sign up",
      });
    }

    if (existingUser && existingUser.isEmailVerified) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already verified, please sign in",
      });
    }

    const latestOtpSentAtMs = existingUser.latestOtpSentAtMs.getTime();

    if (Date.now() - latestOtpSentAtMs >= config.otpExpiresInMs) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "OTP has expired, please sign up again",
      });
    }

    if (input.otp !== existingUser.latestOtpSent) {
      // expire the OTP, forcing user to request new OTP via mail
      await ctx.db.user.update({
        where: { email: input.email },
        data: {
          latestOtpSentAtMs: new Date(0),
        },
      });

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Incorrect OTP",
      });
    }

    const updatedUser = await ctx.db.user.update({
      where: { email: input.email },
      data: {
        isEmailVerified: true,
      },
    });

    return {
      email: updatedUser.email,
      name: updatedUser.name,
      isEmailVerified: updatedUser.isEmailVerified,
    };
  });
