import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { type TypeCategoryListResponse } from "~/server/api/routers/category/list";

type Props = { category: TypeCategoryListResponse["items"][number] };

export default function CategoryListItem({ category }: Props) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {category.title}
        </label>
      </div>
    </div>
  );
}
