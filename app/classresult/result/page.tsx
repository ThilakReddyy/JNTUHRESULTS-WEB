"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";
import Print from "@/components/download/print";
import { collegedata } from "@/constants/colleges";
import { branchDetails } from "@/constants/branchdetails";
import { fetchClassResult } from "@/components/api/fetchResults";

const ClassResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [classResults, setClassResults] = useState<AcademicResulProps[]>([]);
  const componentRef = useRef(null);
  const sharedDetails = classResults[0]?.details;
  const collegeName = sharedDetails
    ? (collegedata[sharedDetails.collegeCode] ?? "—")
    : "—";
  const branch = sharedDetails
    ? (branchDetails[sharedDetails.rollNumber?.substring(6, 8)] ?? "—")
    : "—";

  useEffect(() => {
    const loadResult = async () => {
      if (!htno) {
        router.push("/classresult");
        return;
      }

      const result = await fetchClassResult(htno);
      if (result) {
        setClassResults(result);
      } else {
        router.push("/classresult");
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
            Class Results
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            {classResults.length > 0
              ? `${classResults.length} Student${classResults.length !== 1 ? "s" : ""}`
              : "Loading…"}
          </p>
        </div>

        {classResults.length !== 0 ? (
          <div>
            <section className="mb-6 border border-[#2a342f] bg-[#2a342f] shadow-sm dark:border-white/[0.15] dark:bg-white/[0.15]">
              <div className="bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:bg-[#172033] dark:text-gray-100">
                College &amp; Branch
              </div>
              <div className="grid grid-cols-1 gap-px border-t border-[#2a342f] bg-[#2a342f] text-[#17211e] dark:border-white/[0.15] dark:bg-white/[0.15] dark:text-gray-100 md:grid-cols-2">
                <div className="min-h-16 bg-[#edf3e7] px-4 py-3 dark:bg-[#111827]">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
                    College Name
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug">
                    {collegeName}
                  </p>
                </div>
                <div className="min-h-16 bg-[#edf3e7] px-4 py-3 dark:bg-[#111827]">
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
                    Branch
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug">
                    {branch}
                  </p>
                </div>
              </div>
            </section>

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
                    <ResultDetails
                      details={classresult.details}
                      cmm
                      showInstitution={false}
                    />
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
