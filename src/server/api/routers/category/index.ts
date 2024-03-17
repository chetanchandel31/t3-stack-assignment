import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { list } from "./list";
import { getUserIdFromAuthToken } from "../auth/helpers/authToken";
import { seed } from "./seed";

export const categoryRouter = createTRPCRouter({
  seed,
  list,

  listSelectedCategories: publicProcedure
    .input(z.object({ authToken: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = getUserIdFromAuthToken({ authToken: input.authToken });

      const selectedCategories = await ctx.db.category.findMany({
        where: {
          CategoryOnUser: {
            some: { userId },
          },
        },
      });

      return selectedCategories.map((category) => category.categoryId);
    }),

  select: publicProcedure
    .input(z.object({ authToken: z.string(), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = getUserIdFromAuthToken({ authToken: input.authToken });

      await ctx.db.categoryOnUser.create({
        data: {
          userId,
          categoryId: input.categoryId,
        },
      });

      return { isSuccess: true };
    }),

  unSelect: publicProcedure
    .input(z.object({ authToken: z.string(), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = getUserIdFromAuthToken({ authToken: input.authToken });

      await ctx.db.categoryOnUser.delete({
        where: {
          userId_categoryId: {
            categoryId: input.categoryId,
            userId,
          },
        },
      });

      return { isSuccess: true };
    }),
});
