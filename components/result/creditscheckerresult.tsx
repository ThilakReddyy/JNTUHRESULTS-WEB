import React from "react";

const CreditsCheckerResult = ({
  results,
  htno,
}: {
  results: StudentCredits;
  htno: string;
}) => {
  const studentType = htno[4] === "1" ? "Regular" : "Lateral";
  const finalYear = Object.keys(
    results.academicYears[results.academicYears.length - 1].semesterWiseCredits,
  )[0].split("-")[0];
  const shortfall = results.totalRequiredCredits - results.totalObtainedCredits;
  const isGraduated = finalYear === "4";
  const passed = shortfall <= 0;

  return (
    <div className="flex flex-col gap-5">
      {results.academicYears.map((result: AcademicYear, index: number) => {
        const yearLabel = studentType === "Regular" ? index + 1 : index + 2;
        const creditPercent = Math.min(
          Math.round((result.creditsObtained / result.totalCredits) * 100),
          100,
        );

        return (
          <section
            key={yearLabel}
            className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]"
          >
            <div className="border-b border-[#2a342f] bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:border-white/[0.15] dark:bg-[#172033] dark:text-gray-100">
              Year {yearLabel}
            </div>

            <div className="overflow-x-auto">
              <table className="border-0 text-[#17211e] dark:text-gray-100">
                <thead>
                  <tr className="h-11 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
                    <th className="border-b border-r border-[#2a342f] px-4 text-left dark:border-white/[0.15]">
                      Semester
                    </th>
                    <th className="border-b border-[#2a342f] px-4 text-center dark:border-white/[0.15]">
                      Credits Earned
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.semesterWiseCredits).map(
                    ([semester, credits]) => (
                      <tr
                        key={semester}
                        className="h-11 text-sm [&>td]:border-b [&>td]:border-[#7b867f] last:[&>td]:border-b-0 dark:[&>td]:border-white/10"
                      >
                        <td className="border-r px-4 font-semibold">
                          {semester}
                        </td>
                        <td className="px-4 text-center font-extrabold tabular-nums">
                          {credits}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#2a342f] bg-[#e7ebe2] px-4 py-3 dark:border-white/[0.15] dark:bg-white/[0.04]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
                  Credits Received
                </span>
                <span className="text-sm font-extrabold tabular-nums text-[#17211e] dark:text-gray-100">
                  {result.creditsObtained}
                  <span className="font-normal text-[#53605a] dark:text-gray-400">
                    /{result.totalCredits}
                  </span>
                </span>
              </div>
              <div className="h-1.5 w-full border border-[#7b867f] bg-[#edf3e7] dark:border-white/10 dark:bg-[#111827]">
                <div
                  className="h-full bg-[#17211e] transition-all dark:bg-gray-200"
                  style={{ width: `${creditPercent}%` }}
                />
              </div>
            </div>
          </section>
        );
      })}

      <section className="border border-[#2a342f] bg-[#2a342f] shadow-sm dark:border-white/[0.15] dark:bg-white/[0.15]">
        <div className="bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:bg-[#172033] dark:text-gray-100">
          Credits Summary
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-[#2a342f] bg-[#2a342f] dark:border-white/[0.15] dark:bg-white/[0.15]">
          <div className="bg-[#edf3e7] px-4 py-4 text-center text-[#17211e] dark:bg-[#111827] dark:text-gray-100">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
              Total Earned
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums">
              {results.totalObtainedCredits}
            </p>
          </div>
          <div className="bg-[#edf3e7] px-4 py-4 text-center text-[#17211e] dark:bg-[#111827] dark:text-gray-100">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
              Required
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums">
              {results.totalCredits}
            </p>
          </div>
        </div>
      </section>

      <div
        className={`border px-5 py-4 text-center shadow-sm ${
          passed
            ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-400"
            : "border-red-600/40 bg-red-500/10 text-red-700 dark:text-red-400"
        }`}
      >
        <p className="text-sm font-bold leading-snug">
          {passed ? (
            isGraduated ? (
              "Congratulations, you have graduated!"
            ) : (
              "Congratulations, you are promoted to the next academic year!"
            )
          ) : (
            <>
              You require <span className="underline">{shortfall} more credits</span>{" "}
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
