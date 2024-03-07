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

        if (storageData !== null) {
          setResults(JSON.parse(storageData).slice(0, 5));
        }
        const notifications = await fetchNotifications();

        if (notifications !== null) {
          localStorage.setItem("notifications", JSON.stringify(notifications));
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`lg:hidden bg-opacity-50 backdrop-filter  backdrop-blur-sm fixed h-full   my-5  w-full  justify-center ${path !== "/" || hidden ? "hidden" : ""}`}
    >
      <div className="flex justify-center items-center h-full">
        <div
          className={`md:w-[50%] font-bold text-center flex justify-center dark:bg-[#1B1C1E] w-full  items-center shadow-xl bg-white p-2 rounded-md border m-2 `}
        >
          <div className="text-center">
            <div className="my-2 flex justify-around">
              <div></div>
              <div>Results have been Released!!!</div>
              <div className="flex items-center">
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
            <div className=" h-[412px] p-2 overflow-auto">
              {results.map((result: any, index: number) => {
                return (
                  <div key={index} className="border-t mb-1">
                    <div>{result["Result_title"]}</div>
                    <table className="dark:border-white">
                      <tbody className="text-xs md:text-lg">
                        <tr>
                          <th className="dark:border-white">Result Link 1</th>
                          <th className="dark:border-white">
                            <Link
                              href={`http://202.63.105.184/results/jsp/SearchResult.jsp?${result["Link"].split("?")[1]}`}
                              target="_blank"
                              className="text-blue-500 hover:underline cursor-pointer"
                            >
                              link
                            </Link>
                          </th>
                        </tr>
                        <tr>
                          <th className="dark:border-white">Result Link 2</th>
                          <th className="dark:border-white">
                            <Link
                              href={`http://results.jntuh.ac.in/results/jsp/SearchResult.jsp?${result["Link"].split("?")[1]}`}
                              target="_blank"
                              className="text-blue-500 hover:underline cursor-pointer"
                            >
                              link
                            </Link>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationPopUp;
