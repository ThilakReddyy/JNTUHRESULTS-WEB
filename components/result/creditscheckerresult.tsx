import React from "react";

const CreditsCheckerResult = ({
  results,
  htno,
}: {
  results: StudentCredits;
  htno: string;
}) => {
  const studenttype = htno[4] == "1" ? "Regular" : "Lateral";
  const year = Object.keys(
    results.academicYears[results.academicYears.length - 1].semesterWiseCredits,
  )[0].split("-")[0];

  const shortfall = results.totalRequiredCredits - results.totalObtainedCredits;
  const isGraduated = year === "4";
  const passed = shortfall <= 0;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Per-year cards ── */}
      {results.academicYears.map((result: AcademicYear, index: number) => {
        const yearLabel =
          studenttype === "Regular" ? index + 1 : index + 2;
        const creditPercent = Math.min(
          Math.round((result.creditsObtained / result.totalCredits) * 100),
          100,
        );

        return (
          <div
            key={index}
            className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm"
          >
            {/* Year header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0b3954]">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Year {yearLabel}
              </h3>
            </div>

            {/* Semester credits table */}
            <div className="overflow-x-auto">
              <table
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  border: "none",
                  width: "100%",
                }}
              >
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                    <th
                      className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                      style={{ border: "none" }}
                    >
                      Semester
                    </th>
                    <th
                      className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                      style={{ border: "none" }}
                    >
                      Credits Earned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(result.semesterWiseCredits).map(
                    (semester: string, i: number) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 dark:border-white/5 ${i % 2 === 0
                            ? "bg-white dark:bg-transparent"
                            : "bg-gray-50/80 dark:bg-white/[0.03]"
                          }`}
                      >
                        <td
                          className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200"
                          style={{ border: "none" }}
                        >
                          {semester}
                        </td>
                        <td
                          className="px-4 py-2.5 text-sm text-center font-bold text-[#0b3954] dark:text-sky-400"
                          style={{ border: "none" }}
                        >
                          {result.semesterWiseCredits[semester]}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            {/* Year summary bar */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Credits Received
                </span>
                <span className="text-sm font-extrabold text-[#0b3954] dark:text-sky-400">
                  {result.creditsObtained}
                  <span className="font-normal text-gray-400 dark:text-gray-500">
                    /{result.totalCredits}
                  </span>
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0b3954] dark:bg-sky-400 transition-all"
                  style={{ width: `${creditPercent}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Total credits summary ── */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-white/10">
          <div className="flex flex-col items-center justify-center py-5 bg-white dark:bg-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
              Total Earned
            </p>
            <p className="text-2xl font-extrabold text-[#0b3954] dark:text-sky-400">
              {results.totalObtainedCredits}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-5 bg-gray-50 dark:bg-white/[0.03]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
              Required
            </p>
            <p className="text-2xl font-extrabold text-gray-700 dark:text-gray-200">
              {results.totalCredits}
            </p>
          </div>
        </div>
      </div>

      {/* ── Status banner ── */}
      <div
        className={`rounded-2xl px-5 py-4 border shadow-sm text-center ${passed
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
            : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          }`}
      >
        <p
          className={`text-sm font-bold leading-snug ${passed
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
            }`}
        >
          {passed ? (
            isGraduated
              ? "🎓 Congratulations, you have graduated!"
              : "🎊 Congratulations, you are promoted to the next academic year!"
          ) : (
            <>
              You require{" "}
              <span className="underline underline-offset-2">{shortfall} more credits</span>{" "}
              {isGraduated
                ? "to graduate from college."
                : "to advance to the next academic year."}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default CreditsCheckerResult;
