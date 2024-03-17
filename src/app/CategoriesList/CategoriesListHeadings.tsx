import React from "react";

type Props = {};

export default function CategoriesListHeadings({}: Props) {
  return (
    <div className="flex flex-col items-stretch gap-6">
      <div className="text-center text-2xl font-semibold">
        Please mark your interests!
      </div>

      <div className="text-center text-sm">We will keep you notified</div>

      <div className="text-md font-semibold">My saved interests!</div>
    </div>
  );
}
