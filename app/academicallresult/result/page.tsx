"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Print from "@/components/download/print";
import ResultDetails from "@/components/result/details";

const AcademicAllResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");

  const storageData = localStorage.getItem(String(htno) + "all");
  const componentRef = useRef(null);
  if (storageData == null) {
    router.push("/academicallresult");
  }

  const details = JSON.parse(String(storageData));

  const { Details: resultdetails, Results: resultresults } =
    details?.value?.data || details?.value || {};

  const [renderKey] = useState(0);
  const [Details] = useState(resultdetails);
  const [Results, setResults] = useState(resultresults);
  useEffect(() => {
    if (details === null) {
      // router.push("/academicresult");
    }
  }, [details, router]);
  return details === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <>
      <div
        ref={componentRef}
        key={renderKey}
        className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
      >
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">ACADEMIC All RESULTS</div>
          <div className="justify-end flex "></div>
        </div>

        {/* Render Details */}
        <ResultDetails Details={Details} />

        {Object.keys(Results).map((value: string, index: number) => {
          return (
            <div key={index}>
              <>
                <table className="dark:border-white w-[100%] rounded-t">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 md:bg-gray-300  dark:border-white">
                        {value} Results
                      </th>
                    </tr>
                  </tbody>
                </table>
                {Object.keys(Results[value]).map((examcode) => {
                  return (
                    <React.Fragment key={examcode}>
                      {Results[value][examcode].map(
                        (subexam: any, index: number) => {
                          const exms = Object.keys(subexam)[0];
                          const rcrv = subexam[exms]["subject_internal"]
                            .toLowerCase()
                            .includes("change in grade");

                          return (
                            <div key={index}>
                              <table className="dark:border-white dark:bg-gray-900">
                                <tbody>
                                  <tr>
                                    <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                                      Exam Code: {examcode}
                                    </th>
                                    {rcrv && (
                                      <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                                        Result Type: RC/RV
                                      </th>
                                    )}
                                    <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                                      <a
                                        href={`http://results.jntuh.ac.in/results/resultAction?degree=${htno?.[5] === "R" ? "bpharmacy" : "btech"}&examCode=${examcode}&etype=r16&result=${rcrv ? "gradercrv" : "null"}&grad=null&type=${rcrv ? "rcrvintgrade" : "intgrade"}&htno=${htno}`}
                                        target="_blank"
                                        className="underline"
                                      >
                                        Direct Link
                                      </a>
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                              <table className="dark:border-white dark:bg-gray-900">
                                <tbody>
                                  <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954]">
                                    <th className="dark:border-white px-1">
                                      SUBJECT_CODE
                                    </th>
                                    <th className="dark:border-white px-1">
                                      SUBJECT_NAME
                                    </th>
                                    <th className="dark:border-white px-1">
                                      INTERNAL
                                    </th>
                                    <th className="dark:border-white px-1">
                                      EXTERNAL
                                    </th>
                                    <th className="dark:border-white px-1">
                                      TOTAL
                                    </th>
                                    <th className="dark:border-white px-1">
                                      GRADE
                                    </th>
                                    <th className="dark:border-white px-1">
                                      CREDITS
                                    </th>
                                  </tr>
                                  {Object.values(subexam).map(
                                    (subjectvalue: any, index: number) => {
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
                                          <th
                                            className={`dark:border-white ${["f", "ab", "-"].includes(subjectvalue["subject_grade"].toLowerCase()) ? "text-red-500" : ""}`}
                                          >
                                            {subjectvalue["subject_grade"]}
                                          </th>
                                          <th className="dark:border-white">
                                            {subjectvalue["subject_credits"]}
                                          </th>
                                        </tr>
                                      );
                                    },
                                  )}
                                </tbody>
                              </table>
                            </div>
                          );
                        },
                      )}
                    </React.Fragment>
                  );
                })}

                <br />
              </>
            </div>
          );
        })}
        <div className="flex justify-center text-[6px] text-black">
          jntuhresults.vercel.app
        </div>
      </div>
      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicAllResultResult;
