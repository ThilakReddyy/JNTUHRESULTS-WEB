"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import AcademicAllResult from "@/components/result/academicallresult";
import Print from "@/components/download/print";
import { fetchAllResult } from "@/components/api/fetchResults";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";

const AcademicAllResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");

  const componentRef = useRef(null);
  const [allResult, setAllResult] = useState<AcademicAllResultResponse | null>(
    null,
  );

  useEffect(() => {
    const loadResult = async () => {
      if (!htno) {
        router.push("/academicallresult");
        return;
      }

      const result = await fetchAllResult(htno);
      if (result) {
        setAllResult(result);
      } else {
        router.push("/academicallresult");
      }
    };

    loadResult();
  }, [htno, router]);

  return (
    <>
      <div className="mx-auto px-3 pb-6" ref={componentRef}>
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            All Academic Results
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Complete Exam-wise Performance Record
          </p>
        </div>

        {allResult ? (
          <>
            <ResultDetails details={allResult.details} cmm />
            <AcademicAllResult
              results={allResult.results}
              htno={allResult.details.rollNumber}
            />
          </>
        ) : (
          <>
            <ResultDetailsSkeleton />
            <AcademicResultSkeleton />
          </>
        )}

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhconnect.dhethi.com
        </div>
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicAllResultResult;
