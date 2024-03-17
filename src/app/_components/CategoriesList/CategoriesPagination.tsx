import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Button } from "~/components/ui/button";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const BtnPage = ({
  setPage,
  pageNumber,
  isSelected,
}: {
  setPage: (page: number) => void;
  pageNumber: number;
  isSelected: boolean;
}) => {
  return (
    <Button
      onClick={() => setPage(pageNumber)}
      variant={isSelected ? "secondary" : "ghost"}
      size="icon"
    >
      {isSelected ? <strong>{pageNumber}</strong> : <>{pageNumber}</>}
    </Button>
  );
};

export default function CategoriesPagination({
  page,
  setPage,
  totalPages,
}: Props) {
  const buttons: React.ReactNode[] = [];

  // range of buttons to be shown
  const rangeStartsAt = Math.max(1, page - 1);
  const rangeEndsAt = Math.min(totalPages, page + 1);

  if (rangeEndsAt === totalPages && rangeStartsAt !== 1) {
    buttons.push(
      <BtnPage
        key={"first-page"}
        isSelected={page === 1}
        pageNumber={1}
        setPage={setPage}
      />,
      <div key="...">...</div>,
    );
  }

  for (let i = rangeStartsAt; i <= rangeEndsAt; i++) {
    buttons.push(
      <BtnPage
        key={i}
        isSelected={page === i}
        pageNumber={i}
        setPage={setPage}
      />,
    );
  }

  if (rangeEndsAt !== totalPages) {
    buttons.push(
      <div key="...">...</div>,
      <BtnPage
        key={"last-page"}
        isSelected={page === totalPages}
        pageNumber={totalPages}
        setPage={setPage}
      />,
    );
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        disabled={page === 1}
        onClick={() => setPage(1)}
        variant="outline"
        size="icon"
      >
        <DoubleArrowLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        disabled={page === 1}
        onClick={() => setPage(Math.max(page - 1, 1))}
        variant="outline"
        size="icon"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      {buttons}

      <Button
        disabled={page === totalPages}
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        variant="outline"
        size="icon"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>

      <Button
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
        variant="outline"
        size="icon"
      >
        <DoubleArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
