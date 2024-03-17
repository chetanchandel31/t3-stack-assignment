"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {};

export default function Seed({}: Props) {
  const seedCategories = api.category.seed.useMutation();

  const onClick = () => {
    seedCategories.mutate({});
  };

  return (
    <div>
      <Button disabled={seedCategories.isPending} onClick={onClick}>
        Seed
      </Button>
    </div>
  );
}
