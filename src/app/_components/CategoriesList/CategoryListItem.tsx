import React from "react";
import getAccessToken from "~/app/providers/AuthProvider/helpers/getAuthToken";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "~/components/ui/use-toast";
import { type TypeCategoryListResponse } from "~/server/api/routers/category/list";
import { api } from "~/trpc/react";

type Props = {
  category: TypeCategoryListResponse["items"][number];
  isSelected: boolean;
};

export default function CategoryListItem({ category, isSelected }: Props) {
  const utils = api.useUtils();

  const selectCategory = api.category.select.useMutation({
    onSuccess: () => {
      toast({
        title: "Saved to interests",
        description: (
          <div>
            Category <strong>{category.title}</strong> saved to your interests.
          </div>
        ),
      });

      return utils.category.invalidate();
    },
  });
  const unselectCategory = api.category.unSelect.useMutation({
    onSuccess: () => {
      toast({
        title: "Removed from interests",
        description: (
          <div>
            Category <strong>{category.title}</strong> removed from your
            interests.
          </div>
        ),
      });

      return utils.category.invalidate();
    },
  });

  const onCheckboxClick = () => {
    const authToken = getAccessToken() ?? "";
    if (isSelected) {
      unselectCategory.mutate({ authToken, categoryId: category.categoryId });
    } else {
      selectCategory.mutate({ authToken, categoryId: category.categoryId });
    }
  };

  const isLoading = selectCategory.isPending || unselectCategory.isPending;

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        checked={isSelected}
        disabled={isLoading}
        onClick={onCheckboxClick}
        id="terms1"
      />
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
