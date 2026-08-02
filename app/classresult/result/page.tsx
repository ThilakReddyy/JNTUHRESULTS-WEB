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
      <div className="mx-auto px-3 pb-6" ref={componentRef}>
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
            {classResults.map(
              (classresult: AcademicResulProps, index: number) => (
                <div key={index} className="relative">
                  {/* Student number badge */}
                  <div className="mb-3 flex items-center gap-3 border border-border bg-secondary px-3 py-2">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-border bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                    <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {classresult.details?.rollNumber}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Per-student result block */}
                  <ResultDetails details={classresult.details} cmm />
                  <AcademicResult
                    result={classresult.results}
                    academic={true}
                  />
                  <TotalResult
                    CGPA={classresult.results.CGPA}
                    backlogs={classresult.results.backlogs}
                    cmm
                  />
                </div>
              ),
            )}
          </div>
        ) : (
          <>
            <ResultDetailsSkeleton />
            <AcademicResultSkeleton />
          </>
        )}
      </div>

      <div className="flex justify-center text-[6px] text-gray-400 pb-2">
        jntuhconnect.dhethi.com
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default ClassResultResult;
