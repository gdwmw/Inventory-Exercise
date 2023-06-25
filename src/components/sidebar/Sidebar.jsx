"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiShutDownLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { BsDatabaseFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import PageMenu from "./parts/PageMenu";
import Menu from "./parts/Menu";

export default function SidePanel() {
  return (
    <div className="fixed left-0 flex h-full w-80 flex-col items-center bg-[#2f3349] p-5">
      {/* TITLE */}
      <p className="select-none text-3xl font-bold text-white">
        -- INVENTORY --
      </p>
      {/* TITLE */}

      {/* MENU */}
      <div className="my-5 flex h-full w-full flex-col gap-y-3">
        {/* DASHBOARD */}
        <div className="mb-4 mt-3">
          <PageMenu
            href={"/dashboard"}
            icon={<HiHome size={25} />}
            title={"Dashboard"}
          />
        </div>
        {/* DASHBOARD */}

        {/* SUBTITLE */}
        <p className="text-white">COMPONENTS</p>
        {/* SUBTITLE */}

        {/* DATA MASTER */}
        <Menu
          icon={<BsDatabaseFill size={25} />}
          title={"Data Master"}
          subMenu={
            <>
              <PageMenu
                href={"/userdata"}
                icon={<GoDotFill size={25} />}
                title={"User Data"}
              />
              <PageMenu
                href={"/categorydata"}
                icon={<GoDotFill size={25} />}
                title={"Category Data"}
              />
              <PageMenu
                href={"/stockdata"}
                icon={<GoDotFill size={25} />}
                title={"Stock Data"}
              />
            </>
          }
        />
        {/* DATA MASTER */}

        {/* REPORT */}
        <Menu
          icon={<BiSolidReport size={25} />}
          title={"Report"}
          subMenu={
            <>
              <PageMenu
                href={"/stockin"}
                icon={<GoDotFill size={25} />}
                title={"Stock In"}
              />
              <PageMenu
                href={"/stockout"}
                icon={<GoDotFill size={25} />}
                title={"Stock Out"}
              />
            </>
          }
        />
        {/* REPORT */}

        {/* STOCK IN DATA */}
        <PageMenu
          href={"/stockindata"}
          icon={<RiInboxArchiveFill size={25} />}
          title={"Stock In Data"}
        />
        {/* STOCK IN DATA */}

        {/* STOCK OUT DATA */}
        <PageMenu
          href={"/stockoutdata"}
          icon={<RiInboxUnarchiveFill size={25} />}
          title={"Stock Out Data"}
        />
        {/* STOCK OUT DATA */}
      </div>
      {/* MENU */}

      {/* ACCOUNT */}
      <div className="flex h-16 w-full items-center border-t-2 border-white pt-5">
        <div className="mr-auto flex items-center">
          {/* PHOTO PROFILE */}
          <Image
            src={require("@/assets/images/user/user.jpg")}
            alt="User"
            width={48}
            height={48}
            className="mr-3 rounded-full border-2 border-white"
          />
          {/* PHOTO PROFILE */}

          {/* NAME & ROLE */}
          <div className="flex select-none flex-col justify-center">
            {/* MAX 20 CHARACTER */}
            <p className="w-[180px] overflow-hidden whitespace-nowrap text-white">
              Gede Dewo Wahyu M.W
            </p>
            <p className="text-xs text-[#7367f0]">Super Admin</p>
          </div>
          {/* NAME & ROLE */}
        </div>
        {/* LOGOUT BUTTON */}
        <Link href={"/"}>
          <div className="text-white">
            <RiShutDownLine
              size={22}
              className="cursor-pointer text-red-500 hover:text-white"
            />
          </div>
        </Link>
        {/* LOGOUT BUTTON */}
      </div>
      {/* ACCOUNT */}
    </div>
  );
}
