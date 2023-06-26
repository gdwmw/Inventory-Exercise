import React from "react";

export default function Indicator({ indicator, item }) {
  return (
    <>
      <p className="select-none text-2xl">
        <span className="font-bold">{indicator} : </span>
        {item}
      </p>
    </>
  );
}
