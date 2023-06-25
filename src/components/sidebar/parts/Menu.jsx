"use client";
import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Menu({ hidden, onClick, icon, title, subMenu }) {
  return (
    <div>
      <div
        className="flex h-11 w-full cursor-pointer select-none items-center gap-x-2 rounded-lg p-2 text-white hover:bg-[#7367f0]/50"
        onClick={onClick}
      >
        {icon}
        <p className="text-lg">{title}</p>
        <BiSolidDownArrow size={15} className="ml-auto" />
      </div>
      <div
        className="flex flex-col gap-y-3 pl-5 pt-3"
        style={{ display: hidden }}
      >
        {subMenu}
      </div>
    </div>
  );
}
