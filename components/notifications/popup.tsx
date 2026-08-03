"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api/fetchResults";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { FaTelegram } from "react-icons/fa";
import NoticePopup from "../homepage/notice";
import { askNotificationPermission } from "../pushnotifications/notificationPermission";

const NotificationPopUp = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];

  interface Result {
    title: string;
    date: string;
    link: string;
    releaseDate: string;
  }

  useEffect(() => {
    askNotificationPermission();
    const fetchData = async () => {
      try {
        //
        const notifications = await fetchNotifications({
          title: "",
          year: "",
          degree: "",
          regulation: "",
          page: 1,
        });

        const today = new Date().toISOString().split("T")[0];

        const validNotifications: Result[] = Array.isArray(notifications)
          ? notifications
          : [];
        const tempres = validNotifications.filter(
          (result) => result.releaseDate === today,
        );
        setResults(tempres);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {results.length !== 0 ? (
        <div
          className={`lg:hidden bg-opacity-50 backdrop-filter z-[999]   backdrop-blur-sm fixed h-full   my-5  w-full  justify-center ${path !== "/" || hidden || results.length === 0 ? "hidden" : ""}`}
        >
          <div className="flex justify-center items-center h-full">
            <div
              className="m-2 flex w-full items-center justify-center border border-border bg-card p-2 text-center font-bold text-card-foreground shadow-[4px_4px_0_hsl(var(--border)/0.2)] md:w-[50%]"
            >
              <div className="text-center w-full">
                <div className="py-2 flex justify-around ">
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
                <div className=" h-[390px] p-2 overflow-auto ">
                  {results.map((result: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`border px-1 py-2 ${index === 0 ? "" : "border-t-0"}`}
                      >
                        <div className="font-sans text-sm ">
                          {result["title"]}
                        </div>
                        <table>
                          <tbody className="text-xs md:text-lg">
                            <tr>
                              <th>
                                Result Link 1
                              </th>
                              <th>
                                <Link
                                  href={`http://202.63.105.184/results/jsp/SearchResult.jsp${
                                    result?.link?.includes("?")
                                      ? "?" + result.link.split("?")[1]
                                      : ""
                                  }`}
                                  target="_blank"
                                  className="text-blue-500 hover:underline cursor-pointer"
                                >
                                  link
                                </Link>
                              </th>
                            </tr>
                            <tr>
                              <th>
                                Result Link 2
                              </th>
                              <th>
                                <Link
                                  href={`http://results.jntuh.ac.in/results/jsp/SearchResult.jsp${
                                    result?.link?.includes("?")
                                      ? "?" + result.link.split("?")[1]
                                      : ""
                                  }`}
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
                <div>
                  <Link
                    href="https://t.me/jntuhvercel"
                    target="_blank"
                    className="mt-4 flex items-center justify-center border border-primary bg-primary p-2 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                  >
                    Join us on Telegram{"  "}
                    <FaTelegram size={18} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoticePopup />
      )}
    </>
  );
};
export default NotificationPopUp;
