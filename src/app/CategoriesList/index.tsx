"use client";

import { api } from "~/trpc/react";
import CardContainer from "../_components/CardContainer";
import CategoriesPagination from "./CategoriesPagination";
import { useState } from "react";
import Spinner from "../_components/Spinner";
import CategoriesListHeadings from "./CategoriesListHeadings";
import CategoryListItem from "./CategoryListItem";

type Props = {};

export default function CategoriesList({}: Props) {
  const [page, setPage] = useState(1);

  const categories = api.category.list.useQuery({ page, perPage: 6 });

  return (
    <CardContainer>
      <CategoriesListHeadings />

      {categories.isLoading ? (
        <div className="flex min-h-[144px] items-center justify-center">
          <Spinner minHeight={200} spinnerSize={11} />
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-stretch gap-6">
          <div className="flex flex-col items-stretch gap-4">
            {categories.data?.items.map((category) => (
              <CategoryListItem category={category} key={category.categoryId} />
            ))}
          </div>

          <CategoriesPagination
            page={page}
            setPage={setPage}
            totalPages={categories.data?.totalPages ?? 1}
          />
          {/* <Seed /> */}
        </div>
      )}
    </CardContainer>
  );
}
