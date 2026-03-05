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
      <div
        className="mx-auto px-3 pb-6"
        ref={componentRef}
      >
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
        <ResultDetails details={backlogreport.details} />

        {backlogreport.results.totalBacklogs != 0 ? (
          <>
            {/* Total backlogs banner */}
            <div className="rounded-2xl overflow-hidden border border-red-200 dark:border-red-900/40 shadow-sm my-4">
              <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Total Backlogs
                </span>
                <span className="text-2xl font-extrabold text-red-500 dark:text-red-400">
                  {backlogreport.results.totalBacklogs}
                </span>
              </div>
            </div>

            <AcademicResult result={backlogreport.results} academic={false} />
          </>
        ) : (
          /* No backlogs banner */
          <div className="rounded-2xl overflow-hidden border border-emerald-200 dark:border-emerald-900/40 shadow-sm my-4">
            <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-white/5">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Status
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                ✓ No Backlogs
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhresults.vercel.app
        </div>
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default BacklogReportResult;
