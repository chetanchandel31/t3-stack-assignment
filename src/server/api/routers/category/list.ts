import { z } from "zod";
import { publicProcedure } from "../../trpc";

type TypeResponse = {
  totalPages: number;
  nextPage: number | null;
  items: { categoryId: string; title: string }[];
};

export const list = publicProcedure
  .input(
    z.object({
      page: z.number(),
      perPage: z
        .number()
        .min(1, {
          message: "per-page shouldn't be less than 1",
        })
        .max(100, { message: "per-page should be more than 100" }),
    }),
  )
  .query(async ({ ctx, input }): Promise<TypeResponse> => {
    // query database
    const categories = await ctx.db.category.findMany({
      skip: (input.page - 1) * input.perPage,
      take: input.perPage,
    });

    // build items
    const items: TypeResponse["items"] = categories.map(
      ({ categoryId, title }) => ({ categoryId, title }),
    );

    // pagination meta
    const totalItemsCount = await ctx.db.category.count({});
    const totalPages = Math.ceil(totalItemsCount / input.perPage);
    const nextPage = input.page + 1 <= totalPages ? input.page + 1 : null;

    return { items, nextPage, totalPages };
  });
