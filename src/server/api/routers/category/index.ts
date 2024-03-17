import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { faker } from "@faker-js/faker";
import { list } from "./list";

export const categoryRouter = createTRPCRouter({
  seed: publicProcedure.input(z.object({})).mutation(async ({ ctx }) => {
    const existingCategoriesCount = await ctx.db.category.count();

    if (existingCategoriesCount >= 100) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "already seeded",
      });
    }

    const categoriesMap: Record<string, true> = {};
    let categoriesCount = 0;

    while (categoriesCount < 100) {
      let categoryTitle = faker.commerce.product();

      if (categoriesMap[categoryTitle]) {
        categoryTitle += ` ${faker.lorem.word()}`;
      }

      categoriesMap[categoryTitle] = true;
      categoriesCount++;
    }

    await ctx.db.category.createMany({
      data: Object.keys(categoriesMap).map((title) => ({ title })),
    });

    return categoriesCount;
  }),

  listOwn: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      await ctx.db.category.findMany({
        where: {
          CategoryOnUser: {
            some: { userId: input.userId },
          },
        },
      });
    }),

  list,
});
