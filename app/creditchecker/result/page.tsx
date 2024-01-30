"use client";
import { getLocalStoragedata } from "@/components/api/fetchAcademicResult";
import ResultDetails from "@/components/result/details";
import { creditRegulationDetails } from "@/constants/creditregulations";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreditCheckerResult = () => {
  const router = useRouter();

  const htno = useSearchParams().get("htno");
  const details = getLocalStoragedata(String(htno));
  const credits = creditRegulationDetails["btech"];
  if (parseInt(String(htno?.slice(0, 2))) < 22) {
    const studententry = credits["R18" as keyof typeof credits];
    if (htno?.[4] == "1") {
      console.log(studententry["Regular"]);
      console.log("regular");
    }
  }
  const { Details: resultdetails, Results: resultresults } =
    details?.value || {};

  const [Details] = useState(resultdetails);
  const [Results] = useState(resultresults);
  console.log(resultresults);

  useEffect(() => {
    if (details === null) {
      router.push("/creditchecker");
    }
  }, [details, router]);
  return details === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <div className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center  font-bold my-5 text-xs lg:text-2xl">
        <div className="justify-center">CREDITS CHECKER</div>
      </div>
      <ResultDetails Details={Details} />
    </div>
  );
};

export default CreditCheckerResult;
