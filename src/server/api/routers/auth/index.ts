import { createTRPCRouter } from "~/server/api/trpc";
import { logIn } from "./logIn";
import { signUp } from "./signUp";
import { verifyEmail } from "./verifyEmail";

export const authRouter = createTRPCRouter({
  logIn,
  signUp,
  verifyEmail,
});
