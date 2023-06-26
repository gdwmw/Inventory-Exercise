import React from "react";
import { MdEditSquare } from "react-icons/md";

export default function Title() {
  return (
    <>
      <p className="mb-5 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
        <span className="flex items-center justify-center">
          <MdEditSquare size={30} className="mr-3" />
          EDIT DATA
        </span>
      </p>
    </>
  );
}
