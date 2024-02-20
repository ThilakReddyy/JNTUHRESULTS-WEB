"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";

interface Result {
  Link: string;
  Result_title: string;
  Date: string;
  formatted_date: string;
}

interface notificationResultsProps {
  filteredResults: Result[];
}

const NotificationResults = ({ filteredResults }: notificationResultsProps) => {
  function shareUrl(link: any, title: string) {
    if (!navigator.share) return;

    const sharedText = `*Check out the Results!* \n\n ${title}\n\n\n`;

    navigator
      .share({
        title: "Check out this website!",
        text: sharedText,
        url: link,
      })
      .then(() => console.log("Successfully shared!"))
      .catch((error) => console.log("Error sharing:", error));
  }
  return (
    <>
      <div className="hidden md:block">
        <div className="home-links flex flex-wrap items-center max-w-4xl mt-6 sm:w-full text-center  justify-around mx-auto">
          {filteredResults.length === 0 &&
            "No Notifications for this search query"}
          {filteredResults.map((result, index) => (
            <Link
              key={index}
              href={
                "notifications/" +
                result.Link.split("?")[1] +
                "?" +
                "title=" +
                result.Result_title +
                "&date=" +
                result.Date +
                "&formatted_date=" +
                result.formatted_date
              }
            >
              <div className="border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
                <h3 className="group-hover:text-black text-lg sm:text-xl font-bold">
                  <div className="flex flex-row items-center justify-start dark:text-white">
                    <span className="p-1">{result.Result_title}</span>
                  </div>
                </h3>
                <p className="group-hover:text-black dark:text-slate-100 text-slate-500 mt-4 text-base sm:text-xl">
                  {" "}
                  {result.Date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" md:hidden pt-5">
        {filteredResults.map((result, index) => (
          <div
            key={index}
            className="bg-gray-200  dark:bg-gray-800 text-left p-[20px] mb-[3px] pb-[5px] md:hidden"
          >
            <h3 key={index} className="group-hover:text-black  font-bold ">
              <Link
                href={
                  "notifications/" +
                  result.Link.split("?")[1] +
                  "?" +
                  "title=" +
                  result.Result_title +
                  "&date=" +
                  result.Date +
                  "&formatted_date=" +
                  result.formatted_date
                }
              >
                <div className=" justify-start font-interer  text-base">
                  JNTUH {result.Result_title}
                </div>
              </Link>
              <div className="text-xs text-gray-700 dark:text-gray-200 font-semibold flex  py-2 font-interer">
                <span>{result?.Date} </span>

                <div className="ml-auto flex ">
                  <Link
                    className="px-[5px]"
                    target="_blank"
                    href={`https://api.whatsapp.com/send?text=*Check out the Results!* \n\n ${result.Result_title} \n\n${result.Link}\n`}
                  >
                    <RiWhatsappLine size={17} />
                  </Link>

                  <span
                    className="px-5"
                    onClick={() => shareUrl(result.Link, result.Result_title)}
                  >
                    <AiOutlineShareAlt size={18} />
                  </span>
                </div>
              </div>
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationResults;
