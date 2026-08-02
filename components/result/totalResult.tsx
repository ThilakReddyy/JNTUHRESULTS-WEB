import React from "react";

const TotalResult = ({
  CGPA,
  backlogs,
  cmm = false,
}: {
  CGPA: any;
  backlogs: any;
  cmm?: boolean;
}) => {
  const hasBacklogs = backlogs > 0;

  if (cmm) {
    return (
      <section className="mt-4 border border-[#2a342f] bg-[#2a342f] shadow-sm dark:border-white/[0.15] dark:bg-white/[0.15]">
        <div className="bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:bg-[#172033] dark:text-gray-100">
          Academic Summary
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-[#2a342f] bg-[#2a342f] text-[#17211e] dark:border-white/[0.15] dark:bg-white/[0.15] dark:text-gray-100">
          <div className="flex min-h-20 flex-col items-center justify-center bg-[#edf3e7] px-4 py-3 dark:bg-[#111827]">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
              Total Backlogs
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums">
              {backlogs}
            </p>
          </div>
          <div className="flex min-h-20 flex-col items-center justify-center bg-[#edf3e7] px-4 py-3 dark:bg-[#111827]">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
              Aggregate CGPA
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums">
              {hasBacklogs ? "—" : CGPA}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
      <div className="grid grid-cols-2">
        {/* Backlogs */}
        <div className="flex flex-col items-center justify-center gap-1 py-5 bg-white dark:bg-white/5 border-r border-gray-100 dark:border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
            Backlogs
          </p>
          <p
            className={`text-3xl font-extrabold ${hasBacklogs
                ? "text-red-500 dark:text-red-400"
                : "text-emerald-600 dark:text-emerald-400"
              }`}
          >
            {backlogs}
          </p>
          {!hasBacklogs && (
            <span className="mt-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
              Clear
            </span>
          )}
        </div>

        {/* CGPA */}
        <div className="flex flex-col items-center justify-center gap-1 py-5 bg-gray-50 dark:bg-white/[0.03]">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
            CGPA
          </p>
          <p className="text-3xl font-extrabold text-[#0b3954] dark:text-sky-400">
            {hasBacklogs ? "—" : CGPA}
          </p>
          {!hasBacklogs && CGPA && (
            <span className="mt-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-full">
              Cumulative
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalResult;
