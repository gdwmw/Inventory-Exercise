"use client";
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Menu({ icon, title, subMenu }) {
  const [hide, setHide] = useState("hidden");
  function fHide() {
    if (hide === "hidden") {
      setHide("");
    } else {
      setHide("hidden");
    }
  }
  return (
    <div>
      <div
        className="flex h-11 w-full cursor-pointer select-none items-center gap-x-2 rounded-lg p-2 text-white hover:bg-[#7367f0]/50"
        onClick={fHide}
      >
        {icon}
        <p className="text-lg">{title}</p>
        <BiSolidDownArrow size={15} className="ml-auto" />
      </div>
      <div className={`flex flex-col gap-y-3 pl-5 pt-3 ${hide}`}>{subMenu}</div>
    </div>
  );
}
