import { getSemLabel, getSemNarrative, isFailGrade } from "./utils";

interface SemesterStoryProps {
  semesters: any[];
}

const sgpaBarColor = (sgpa: number) => {
  if (sgpa >= 9.0) return "bg-emerald-500";
  if (sgpa >= 8.0) return "bg-blue-500";
  if (sgpa >= 7.0) return "bg-indigo-500";
  if (sgpa >= 6.0) return "bg-amber-500";
  return "bg-red-500";
};

const SemesterStory = ({ semesters }: SemesterStoryProps) => {
  if (!semesters || semesters.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm mb-6 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-white/10">
        <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Chapter by Chapter
        </h3>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-white/10">
        {semesters.map((sem: any, i: number) => {
          const sgpa = parseFloat(sem.semesterSGPA || "0");
          const prevSgpa =
            i > 0 ? parseFloat(semesters[i - 1].semesterSGPA || "0") : null;
          const semBacklogs: any[] = (sem.subjects ?? []).filter((s: any) =>
            isFailGrade(s.grades)
          );
          const narrative = getSemNarrative(
            sgpa, prevSgpa, semBacklogs.length, i === 0
          );
          const barPct = Math.min(100, (sgpa / 10) * 100);
          const hasSGPA = sgpa > 0;

          return (
            <div
              key={i}
              className="px-4 py-4 flex flex-col md:flex-row md:items-center gap-3"
            >
              <div className="min-w-[148px]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  {getSemLabel(sem.semester)}
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-0.5">
                  {hasSGPA ? sgpa.toFixed(2) : "—"}
                  {hasSGPA && (
                    <span className="text-xs font-normal text-gray-400 ml-1">
                      SGPA
                    </span>
                  )}
                </p>
              </div>

              <div className="flex-1">
                <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  {hasSGPA && (
                    <div
                      className={`h-full rounded-full ${sgpaBarColor(sgpa)}`}
                      style={{ width: `${barPct}%` }}
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic leading-relaxed">
                  {hasSGPA ? narrative : "Results not yet available."}
                </p>
              </div>

              <div className="min-w-[90px] text-right shrink-0">
                {semBacklogs.length > 0 ? (
                  <span className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-full px-2.5 py-1">
                    {semBacklogs.length} backlog{semBacklogs.length > 1 ? "s" : ""}
                  </span>
                ) : hasSGPA ? (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full px-2.5 py-1">
                    All clear
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemesterStory;
