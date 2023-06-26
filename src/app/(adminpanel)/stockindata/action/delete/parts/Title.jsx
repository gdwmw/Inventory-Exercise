import React from "react";
import { AiFillDelete } from "react-icons/ai";

export default function Title() {
  return (
    <>
      <p className="mb-3 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
        <span className="flex items-center justify-center">
          <AiFillDelete size={35} className="mr-3" />
          DELETE DATA?
        </span>
      </p>
    </>
  );
}
