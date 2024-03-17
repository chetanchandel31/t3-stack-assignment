import { faker } from "@faker-js/faker";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const seed = publicProcedure
  .input(z.object({}))
  .mutation(async ({ ctx }) => {
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
  });
