"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResultDetails from "@/components/result/details";
import QuickNavigation from "@/components/navbar/quicknavigation";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import CreditsCheckerResult from "@/components/result/creditscheckerresult";

const CreditCheckerResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  if (htno == null) {
    router.push("/creditchecker");
    return;
  }
  const creditsCheckerReport = getFromLocalStorage(
    String(htno) + "-CreditsCheckerreport",
  );
  if (creditsCheckerReport === null) {
    router.push("/creditchecker");
  }
  return (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        <div className="text-center font-bold my-5 text-xs lg:text-2xl">
          <div className="justify-center">CREDITS CHECKER</div>
        </div>
        <ResultDetails details={creditsCheckerReport.details} />
        <CreditsCheckerResult
          results={creditsCheckerReport.results}
          htno={htno}
        />
      </div>
      <div className="flex justify-center text-[6px] text-black">
        jntuhresults.vercel.app
      </div>
      <QuickNavigation htno={htno} />
    </>
  );
};

export default CreditCheckerResult;
