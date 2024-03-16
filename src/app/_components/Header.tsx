import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 z-20 mb-12 border-b-2 backdrop-blur-md">
      <div className="flex items-center gap-2 px-8 py-2">
        <div className="text-2xl font-bold">ECOMMERCE</div>

        <div className="hidden flex-1 justify-center gap-8 md:flex">
          <div className="text-sm font-semibold">Categories</div>
          <div className="text-sm font-semibold">Sale</div>
          <div className="text-sm font-semibold">Clearance</div>
          <div className="text-sm font-semibold">New stock</div>
        </div>
      </div>
    </header>
  );
}
