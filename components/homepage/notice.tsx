"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api/fetchNotifications";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const NotificationPopUp = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];

  console.log(path);
  interface Result {
    Result_title: string;
    Date: string;
    Link: string;
    formatted_date: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageData = localStorage.getItem("notifications");

        const today = new Date().toISOString().split("T")[0].toString();
        // const today = "2024-03-07";
        if (storageData !== null) {
          const storagedata = JSON.parse(storageData);
          var tempres = (storagedata as Result[]).filter((result) => {
            return result.formatted_date === today;
          });
          setResults(tempres);
        }
        const notifications = await fetchNotifications();
        if (notifications !== null) {
          localStorage.setItem("notifications", JSON.stringify(notifications));
          var tempres = (notifications as Result[]).filter((result) => {
            return result.formatted_date === today;
          });
          setResults(tempres);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`lg:hidden bg-opacity-50 backdrop-filter  backdrop-blur-sm fixed h-full   my-5  w-full  justify-center`}
    >
      <div className="flex justify-center items-center h-full">
        <div className=" h-[412px] p-2 overflow-auto"></div>
      </div>
    </div>
  );
};
export default NotificationPopUp;
