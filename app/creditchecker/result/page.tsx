"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLocalStoragedata } from "@/components/api/fetchAcademicResult";
import { DivideArrayIntoSubArray } from "@/components/customfunctions/divideArrayIntosubArrays";
import { creditRegulationDetails } from "@/constants/creditregulations";
import ResultDetails from "@/components/result/details";

const CreditCheckerResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const htno = searchParams.get("htno");

  useEffect(() => {
    if (!htno || !Details) {
      router.push("/creditchecker");
    }
  });

  if (!htno) {
    return null;
  }

  const { Details, Results } = getLocalStoragedata(String(htno))?.value || {};
  if (!Details) {
    return null;
  }
  const resultKeys = Object.keys(Results || {}).filter(
    (key) => key !== "Total",
  );
  const keys = DivideArrayIntoSubArray(resultKeys || []);

  const receivedCredits = keys.map((subkeys) =>
    subkeys.reduce((credit, key) => credit + (Results[key]?.credits || 0), 0),
  );

  const regulation = parseInt(htno.slice(0, 2)) < 22 ? "R18" : "R22";
  const studenttype = htno?.[4] === "1" ? "Regular" : "Lateral";
  const creditregulations =
    creditRegulationDetails["btech"]?.[
      regulation as keyof (typeof creditRegulationDetails)["btech"]
    ]?.[studenttype];
  var studentType = 0;
  if (studenttype === "Lateral") {
    studentType = 1;
  }

  const credits = receivedCredits.map((receivedcredit, index) => ({
    credits_received: receivedcredit,
    total_credits:
      creditregulations[index + 1 + studentType]["Total"] -
      (index > studentType ? creditregulations[index]["Total"] : 0),
  }));
  var totalCredits = 0;
  receivedCredits.map((receivedcredit) => {
    totalCredits += receivedcredit;
  });
  const year = keys.length + studentType;
  return (
    <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-5 text-xs lg:text-2xl">
        <div className="justify-center">CREDITS CHECKER</div>
      </div>
      {/* Render the ResultDetails component */}
      <ResultDetails Details={Details} />
      <>
        {keys.map((subkeys, index) => {
          return (
            <div key={index} className="my-2">
              <table className="dark:border-white">
                <tbody>
                  <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954] ">
                    <th className="dark:border-white">{index + 1} Year</th>
                  </tr>
                </tbody>
              </table>
              <div className="dark:border-white border border-black border-solid">
                <table className="dark:border-white">
                  <tbody>
                    <tr className="w-max bg-gray-200 md:bg-gray-300  dark:border-white dark:bg-[#0b3954]">
                      <th className="dark:border-white w-[50%]">SEMESTER</th>
                      <th className="dark:border-white ">CREDITS</th>
                    </tr>
                    {subkeys.map((key, ind) => {
                      return (
                        <tr className="w-max " key={index + ind}>
                          <th className="dark:border-white">{key}</th>
                          <th className="dark:border-white">
                            {Results[key]["credits"]}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table className="dark:border-white mt-1">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 md:gray-300 w-[50%] dark:border-white dark:bg-[#0b3954]">
                        Credits Obtained
                      </th>
                      <th className="dark:border-white">
                        {credits[index]["credits_received"]}/
                        {credits[index]["total_credits"]}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
        <table className="dark:border-white">
          <tbody>
            <tr>
              <th className="bg-gray-200 md:gray-300 w-[50%] dark:border-white dark:bg-[#0b3954]">
                Total Credits
              </th>
              <th className="w-[50%] dark:border-white">
                {totalCredits}/{creditregulations[year]["Total"]}
              </th>
            </tr>
          </tbody>
        </table>
        <div className="text-center text-sm border-black border my-2  p-[0.5px]">
          <div className="border-black border text-[70%] md:text-[100%] py-1 bg-gray-200 dark:bg-[#0b3954] border-separate border-spacing-4 m-[0.5px]">
            {totalCredits < creditregulations[year]["Required"] ? (
              <div>
                You require{" "}
                <b>{creditregulations[year]["Required"] - totalCredits}</b>{" "}
                additional credits
                {year === 4
                  ? " to graduate from college"
                  : " to advance to the next academic year."}
              </div>
            ) : (
              <div>
                <b>
                  {year !== 4
                    ? "Congratulations you have promoted to the next academic year"
                    : "Congratulations you have been graduated 🎓"}
                </b>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default CreditCheckerResult;
