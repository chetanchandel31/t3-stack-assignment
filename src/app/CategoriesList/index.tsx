"use client";

import { api } from "~/trpc/react";
import CardContainer from "../_components/CardContainer";
import CategoriesPagination from "./CategoriesPagination";
import { useState } from "react";
import Spinner from "../_components/Spinner";

type Props = {};

export default function CategoriesList({}: Props) {
  const [page, setPage] = useState(1);

  const categories = api.category.list.useQuery({ page, perPage: 6 });

  return (
    <CardContainer>
      CategoriesList
      {categories.isLoading ? (
        <Spinner />
      ) : (
        <>
          <pre>{JSON.stringify(categories.data, null, 2)}</pre>
          <CategoriesPagination
            page={page}
            setPage={setPage}
            totalPages={categories.data?.totalPages ?? 1}
          />
          {/* <Seed /> */}
        </>
      )}
    </CardContainer>
  );
}
