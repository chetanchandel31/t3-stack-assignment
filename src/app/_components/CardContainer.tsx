import React from "react";

type Props = { children: React.ReactNode };

export default function CardContainer({ children }: Props) {
  return (
    <div className="container mx-auto w-[500px] max-w-[95%] rounded-lg border-2 px-4 py-6 md:px-14 md:py-8">
      {children}
    </div>
  );
}
