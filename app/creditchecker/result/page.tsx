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
    return;
  }

  return (
    <>
      <div className="mx-auto px-3 pb-6">
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Credits Checker
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Year-wise Credit Progress
          </p>
        </div>

        <ResultDetails details={creditsCheckerReport.details} />

        <CreditsCheckerResult
          results={creditsCheckerReport.results}
          htno={htno}
        />

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhresults.vercel.app
        </div>
      </div>

      <QuickNavigation htno={htno} />
    </>
  );
};

export default CreditCheckerResult;
