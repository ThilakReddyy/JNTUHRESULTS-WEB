"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResultDetails from "@/components/result/details";
import QuickNavigation from "@/components/navbar/quicknavigation";
import CreditsCheckerResult from "@/components/result/creditscheckerresult";
import { fetchCreditsCheckerReport } from "@/components/api/fetchResults";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";

const CreditCheckerResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [creditsCheckerReport, setCreditsCheckerReport] =
    useState<CreditsCheckerReport | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      if (!htno) {
        router.push("/creditchecker");
        return;
      }

      const result = await fetchCreditsCheckerReport(htno);
      if (result) {
        setCreditsCheckerReport(result);
      } else {
        router.push("/creditchecker");
      }
    };

    loadResult();
  }, [htno, router]);

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

        {creditsCheckerReport ? (
          <>
            <ResultDetails details={creditsCheckerReport.details} cmm />
            <CreditsCheckerResult
              results={creditsCheckerReport.results}
              htno={htno || ""}
            />
          </>
        ) : (
          <ResultDetailsSkeleton />
        )}

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhconnect.dhethi.com
        </div>
      </div>

      <QuickNavigation htno={htno || ""} />
    </>
  );
};

export default CreditCheckerResult;
