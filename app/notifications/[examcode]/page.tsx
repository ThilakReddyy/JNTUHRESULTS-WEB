"use client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";

const Examcode = ({ params }: any) => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  var examcode = params["examcode"];
  examcode = examcode.replaceAll("%3D", "=");
  examcode = examcode.replaceAll("%26", "&");
  if (title === null) {
    redirect("/notifications");
  }
  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-center m-6 max-w-5xl ">
        <div>
          <div className="font-bold text-2xl">{title}</div>
          <div className="text-gray-400 text-xs  m-2 md:flex">
            <div className="mr-2 mb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="ml-1">JNTUH VERCEL</div>
            </div>
            <div className="mr-2 mb-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock-8"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 8 14" />
              </svg>
              <div className="ml-1 flex">
                Last Updated:<div className="ml-1">{date}</div>
              </div>
            </div>
          </div>
          <div className="border-t  border-gray-400 pt-6">
            <div className="font-bold justify-center flex p-2">
              Direct Links
            </div>
            <table className="dark:border-white">
              <tbody className="text-xs md:text-lg">
                <tr>
                  <th className="dark:border-white">Result Link 1</th>
                  <th className="dark:border-white">
                    <Link
                      href={`http://202.63.105.184/results/jsp/SearchResult.jsp?${examcode}`}
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
                      href={`http://results.jntuh.ac.in/results/jsp/SearchResult.jsp?${examcode}`}
                      target="_blank"
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      link
                    </Link>
                  </th>
                </tr>
              </tbody>
            </table>
            <p className="text-xs mt-8">Results Published on: {date}</p>
            <p className="mt-4 text-justify text-xs">
              <span className="text-gray-600">Note:</span>
              <br />
              As per prevailing practice since 2012, if difference of marks
              after revaluation and first valuation is more than or equal to 15%
              of maximum external marks then revaluation marks will be retained.
              If the change is less than 15% or marks secured in revaluation is
              less than first valuation marks, the first valuation marks shall
              be retained.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examcode;
