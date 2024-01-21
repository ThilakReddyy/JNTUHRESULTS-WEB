"use client";
import React from "react";
import { grades, credits } from "@/constants/resultconstants";

interface ResultResultsProps {
  Results: Record<string, any>;
}

const ResultResults = ({ Results }: ResultResultsProps) => {
  return (
    <>
      {Object.keys(Results).map((value: string, index: number) => {
        return (
          <div key={index}>
            {value != "Total" ? (
              <>
                <table className="dark:border-white w-[100%]">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                        {value} Results
                      </th>
                    </tr>
                  </tbody>
                </table>
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
                    {Object.values(Results[value]).map(
                      (subjectvalue: any, index: number) => {
                        if (typeof subjectvalue === "object") {
                          return (
                            <tr key={index}>
                              <th className="dark:border-white">
                                {subjectvalue["subject_code"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_name"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_internal"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_external"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_total"]}
                              </th>

                              <th className="dark:border-white">
                                {subjectvalue["subject_grade"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_credits"]}
                              </th>
                            </tr>
                          );
                        }
                      },
                    )}
                  </tbody>
                </table>
                <table className="dark:border-white">
                  <tbody>
                    <tr>
                      <th className="dark:border-white w-[75%]">CGPA</th>
                      <th className="dark:border-white">
                        {Results[value]["CGPA"]}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <br />
              </>
            ) : (
              <table className="dark:border-white" key={index}>
                <tbody>
                  <tr>
                    <th className="dark:border-white w-[75%]">TOTAL CGPA</th>
                    <th className="dark:border-white">{Results[value]}</th>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ResultResults;
