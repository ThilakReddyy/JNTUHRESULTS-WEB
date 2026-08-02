"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicResult from "@/components/result/academicresult";
import Print from "@/components/download/print";
import { useRef } from "react";

const BacklogReportResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const htno = searchParams.get("htno");
  const backlogreport = getFromLocalStorage(htno + "-Backlogreport");

  const componentRef = useRef(null);
  if (backlogreport === null) {
    router.push("/backlogreport");
  }

  return backlogreport === null ? (
    <div className="mx-auto px-3 py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
      Details not found
    </div>
  ) : (
    <>
      <div className="mx-auto px-3 pb-6" ref={componentRef}>
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Backlog Report
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Pending Subjects Overview
          </p>
        </div>

        {/* Student details */}
        <ResultDetails details={backlogreport.details} cmm />

        {backlogreport.results.totalBacklogs != 0 ? (
          <>
            {/* Total backlogs banner */}
            <div className="my-4 border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between bg-secondary px-5 py-3 text-secondary-foreground">
                <span className="text-xs font-bold uppercase tracking-widest">
                  Total Backlogs
                </span>
                <span className="text-xl font-extrabold text-red-600 dark:text-red-400">
                  {backlogreport.results.totalBacklogs}
                </span>
              </div>
            </div>

            <AcademicResult
              result={backlogreport.results}
              academic={false}
              cmm
            />
          </>
        ) : (
          /* No backlogs banner */
          <div className="my-4 border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between bg-secondary px-5 py-3 text-secondary-foreground">
              <span className="text-xs font-bold uppercase tracking-widest">
                Status
              </span>
              <span className="border border-emerald-600/40 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                ✓ No Backlogs
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhconnect.dhethi.com
        </div>
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default BacklogReportResult;
