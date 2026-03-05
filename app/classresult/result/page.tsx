"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";
import Print from "@/components/download/print";

const ClassResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const type = useSearchParams().get("type");
  const [classResults, setClassResults] = useState<AcademicResulProps[]>([]);
  const componentRef = useRef(null);

  useEffect(() => {
    const academicResult = getFromLocalStorage(htno + "-ClassResult-" + type);
    setClassResults(academicResult);
    if (academicResult === null) {
      router.push("/classresult");
    }
  }, [htno, type, router]);

  return (
    <>
      <div
        className="mx-auto px-3 pb-6 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Class Results
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            {classResults.length > 0
              ? `${classResults.length} Student${classResults.length !== 1 ? "s" : ""}`
              : "Loading…"}
          </p>
        </div>

        {classResults.length !== 0 ? (
          <div className="flex flex-col gap-10">
            {classResults.map((classresult: AcademicResulProps, index: number) => (
              <div key={index} className="relative">
                {/* Student number badge */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0b3954] text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase whitespace-nowrap">
                    {classresult.details?.rollNumber}
                  </span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                </div>

                {/* Per-student result block */}
                <ResultDetails details={classresult.details} />
                <AcademicResult result={classresult.results} academic={true} />
                <TotalResult
                  CGPA={classresult.results.CGPA}
                  backlogs={classresult.results.backlogs}
                />
              </div>
            ))}
          </div>
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

export default ClassResultResult;
