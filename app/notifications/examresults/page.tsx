"use client";
import ResultDetails from "@/components/result/details";
import { useSearchParams } from "next/navigation";
import React from "react";

const NotificationExamResults = () => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("query") || "";
  const htno = searchParams.get("htno");
  const title = searchParams.get("title");
  const storage: string =
    localStorage.getItem(htno + encodeURIComponent(query)) || "";
  const storageJson = JSON.parse(storage);
  if (title == null || htno === null || storage == null) {
    return;
  }
  const results = Object.values(storageJson["Results"]);
  return (
    <>
      <div className="flex w-full justify-center ">
        <div className="flex justify-center m-6 max-w-5xl mb-0">
          <div>
            <div className="xl:flex font-bold text-2xl">{title}</div>
          </div>
        </div>
      </div>
      <div className="m-2 text-[30%]  sm:text-[45%] border-t-gray-700 border-t pt-4 md:text-[60%] lg:text-[100%]">
        {/* <ResultDetails Details={storageJson["Details"]} /> */}
        <div className="font-bold text-center">
          <table className="dark:border-white">
            <tbody>
              <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954]">
                <th className="dark:border-white">SUBJECT_CODE</th>
                <th className="dark:border-white">SUBJECT_NAME</th>
                <th className="dark:border-white">INTERNAL</th>
                <th className="dark:border-white">EXTERNAL</th>
                <th className="dark:border-white">TOTAL</th>
                <th className="dark:border-white">GRADE</th>
                <th className="dark:border-white">CREDITS</th>
              </tr>

              {results.map((result: any, index: number) => {
                return (
                  <tr key={index}>
                    <th>{result["subject_code"]}</th>
                    <th>{result["subject_name"]}</th>
                    <th>{result["subject_internal"]}</th>
                    <th>{result["subject_external"]}</th>
                    <th>{result["subject_total"]}</th>
                    <th>{result["subject_grade"]}</th>
                    <th>{result["subject_credits"]}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NotificationExamResults;
