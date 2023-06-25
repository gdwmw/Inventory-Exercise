"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageMenu({ href, icon, title }) {
  const pathname = usePathname();
  return (
    <Link href={`${href}`}>
      <div
        className={`flex h-11 w-full cursor-pointer select-none items-center gap-x-2 rounded-lg ${
          pathname === href ? "bg-[#7367f0]" : ""
        } p-2 text-white ${pathname === href ? "" : "hover:bg-[#7367f0]/50"}`}
      >
        {icon}
        <p className="text-lg">{title}</p>
      </div>
    </Link>
  );
}
