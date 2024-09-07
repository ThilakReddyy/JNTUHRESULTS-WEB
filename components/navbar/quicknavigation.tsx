"use client";
import React, { useState } from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";
import Link from "next/link";
import { useSidebarContext } from "@/customhooks/sidebarhook";

const QuickNavigation = ({ htno }: { htno: string | null }) => {
  const [extraItems, setExtraItems] = useState(false);

  const { sidebar } = useSidebarContext();
  if (htno === null) {
    return null;
  }
  return (
    <>
      <div
        className={`fixed bottom-0   right-0 m-5 cursor-pointer rounded-full bg-black dark:bg-white dark:text-black   text-white border p-2 z-[401] ${sidebar ? "hidden" : ""}`}
      >
        <GrAdd
          className={`${extraItems ? "hidden" : ""}`}
          onClick={() => {
            setExtraItems(!extraItems);
          }}
        />
        <GrSubtract
          className={`${extraItems ? "" : "hidden"}`}
          onClick={() => {
            setExtraItems(!extraItems);
          }}
        />
      </div>
      <div
        className={`${extraItems ? "fixed w-[100%]  h-[100%] bg-opacity-50 backdrop-filter  backdrop-blur-sm bottom-0 z-[400] top-[64px] text-white" : ""}`}
      ></div>

      <div
        className={`${extraItems ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity z-[401] duration-300 fixed bottom-10 right-2 m-5 rounded bg-gray-900 dark:bg-white text-black text-[12px] border p-2 `}
      >
        <div className="flex flex-col justify-center ">
          <Link
            href={`/academicallresult/result?htno=${htno}`}
            className="py-2 border  border-b-0 border-t-rounded flex rounded-t px-20  justify-center  text-blue-600 cursor-pointer"
          >
            Academic All Result
          </Link>
          <Link
            href={`/academicresult/result?htno=${htno}`}
            className="py-2 border  border-b-0  flex px-20  justify-center  text-blue-600 cursor-pointer"
          >
            Academic Result
          </Link>
          <Link
            href={`/backlogreport/result?htno=${htno}`}
            className="py-2 border px-20 flex justify-center  text-blue-600 cursor-pointer"
          >
            Backlog Report
          </Link>
          <Link
            href={`/creditchecker/result?htno=${htno}`}
            className="p-2 border border-t-0 px-20 flex justify-center rounded-b  text-blue-600 cursor-pointer"
          >
            Credits Checker
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuickNavigation;
