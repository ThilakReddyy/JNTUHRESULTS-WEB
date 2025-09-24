"use client";

import { RefreshCcw } from "lucide-react";
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
        className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">ACADEMIC RESULTS</div>
          <div className="justify-end flex ">
            <div
              className="border border-white p-1 md:p-2 md:hidden rounded cursor-pointer justify-center items-center  hidden"
              onClick={() => {}}
            >
              <RefreshCcw size={6} />
            </div>
          </div>
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
      <div className="flex justify-center text-[6px] text-black">
        jntuhresults.vercel.app
      </div>
      {/* <QuickNavigation htno={htno} /> */}
      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicResultResult;
