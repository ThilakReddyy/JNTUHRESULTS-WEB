"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import NoticeText from "./noticetext";
const NoticePopup = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  const path = "/" + pathname.split("/")[1];

  return (
    <div
      className={` bg-opacity-50 backdrop-filter  backdrop-blur-sm fixed h-full w-full   my-5    justify-center ${path !== "/" || hidden ? "hidden" : ""}`}
    >
      <div className="flex justify-center items-start w-full md:mt-16 h-full">
        <div
          className={`md:w-[60%] border-black dark:border-white font-bold text-center flex md:items-center justify-center dark:bg-[#1B1C1E] w-full  items-center shadow-xl bg-white p-2 rounded-md border m-2 `}
        >
          <div className="text-center w-full">
            <div className="py-2 flex  justify-around  border-b">
              <div className="w-full"></div>
              <div className="p-2 w-full">Announcement!!!</div>
              <div className="flex items-center justify-end w-full">
                <Button
                  onClick={() => {
                    setHidden(true);
                  }}
                  className="h-[2px] rounded w-[2px] px-[10px] text-[10px]"
                >
                  X
                </Button>
              </div>
            </div>
            <NoticeText />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticePopup;
