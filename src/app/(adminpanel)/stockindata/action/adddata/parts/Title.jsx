import React from "react";
import { BsDatabaseFillAdd } from "react-icons/bs";

export default function Title({ title }) {
  return (
    <>
      <p className="mb-5 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
        <span className="flex items-center justify-center">
          <BsDatabaseFillAdd size={30} className="mr-3" />
          {title}
        </span>
      </p>
    </>
  );
}
