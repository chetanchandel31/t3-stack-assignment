import { createTRPCRouter } from "~/server/api/trpc";
import { logIn } from "./logIn";
import { signUp } from "./signUp";
import { confirmOtp } from "./confirmOtp";

export const authRouter = createTRPCRouter({
  logIn,
  signUp,
  confirmOtp,
});
