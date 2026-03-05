"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";
import Print from "@/components/download/print";
import { fetchAcademicResult } from "@/components/api/fetchResults";

const AcademicResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [academicResult, setAcademicResult] =
    useState<AcademicResulProps | null>(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchResult = async () => {
      const academicResult = await fetchAcademicResult(htno || "");
      if (academicResult) {
        setAcademicResult(academicResult);
        return;
      }
      if (academicResult === null) {
        router.push("/academicresult");
      }
    };
    fetchResult();
  }, [htno, router]);

  return (
    <>
      <div
        className="mx-auto  px-3 pb-6 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Academic Results
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Semester-wise Performance Overview
          </p>
        </div>

        {academicResult ? (
          <>
            <ResultDetails details={academicResult.details} />
            <AcademicResult result={academicResult.results} academic={true} />
            <TotalResult
              CGPA={academicResult.results.CGPA}
              backlogs={academicResult.results.backlogs}
            />
          </>
        ) : (
          <>
            <ResultDetailsSkeleton />
            <AcademicResultSkeleton />
          </>
        )}
      </div>

      <div className="flex justify-center text-[6px] text-gray-400 pb-2">
        jntuhresults.vercel.app
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicResultResult;
