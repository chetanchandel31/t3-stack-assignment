import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const verifyEmail = publicProcedure
  .input(z.object({}))
  .mutation(async () => {
    //
  });
