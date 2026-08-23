"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api/fetchResults";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import NoticePopup from "../homepage/notice";
import { askNotificationPermission } from "../pushnotifications/notificationPermission";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  useMobilePlatform,
} from "@/customhooks/appdownloadhook";
import { logger } from "@/lib/telemetry/logger";

const NotificationPopUp = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [hidden, setHidden] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[1];
  const isIOS = useMobilePlatform() === "ios";

  interface Result {
    title: string;
    date: string;
    link: string;
    releaseDate: string;
  }

  useEffect(() => {
    const popupTimer = window.setTimeout(() => {
      setIsReady(true);
      void askNotificationPermission();
    }, 700);

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
        logger.error("notification-popup", error);
      }
    };
    fetchData();

    return () => window.clearTimeout(popupTimer);
  }, []);

  if (!isReady) return null;

  return (
    <>
      {results.length !== 0 ? (
        <div
          className={`lg:hidden bg-opacity-50 backdrop-filter z-[999]   backdrop-blur-sm fixed h-full   my-5  w-full  justify-center ${path !== "/" || hidden || results.length === 0 ? "hidden" : ""}`}
        >
          <div className="flex justify-center items-center h-full">
            <div className="m-2 flex w-full items-center justify-center border border-border bg-card p-2 text-center font-bold text-card-foreground shadow-[4px_4px_0_hsl(var(--border)/0.2)] md:w-[50%]">
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
                              <th>Result Link 1</th>
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
                              <th>Result Link 2</th>
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
                    href={isIOS ? APP_STORE_URL : PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      isIOS
                        ? "Download JNTUH Connect on the App Store"
                        : "Download JNTUH Connect on Google Play"
                    }
                    className="mt-4 flex items-center justify-center border border-primary bg-primary p-2 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
                  >
                    {isIOS ? (
                      <FaApple size={18} className="mr-2" />
                    ) : (
                      <FaGooglePlay size={18} className="mr-2" />
                    )}

                    {"  "}
                    {isIOS ? "Download on App store" : "Download Android App"}
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
