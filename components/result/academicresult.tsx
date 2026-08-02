import { Fragment } from "react";

const GRADE_POINTS: Record<string, number | string> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  D: 5,
  F: 0,
  AB: 0,
  "-": "-",
};

const ACADEMIC_YEARS = [
  { label: "I YEAR", semesters: ["1-1", "1-2"] },
  { label: "II YEAR", semesters: ["2-1", "2-2"] },
  { label: "III YEAR", semesters: ["3-1", "3-2"] },
  { label: "IV YEAR", semesters: ["4-1", "4-2"] },
];

const CmmSemesterTable = ({
  semester,
  position,
  rowCount,
}: {
  semester: Record<string, any>;
  position: number;
  rowCount: number;
}) => (
  <section className="h-full min-w-0 bg-[#edf3e7] text-[#17211e] dark:bg-[#111827] dark:text-gray-100">
    <div className="flex min-h-9 items-center justify-between border-b border-[#2a342f] bg-[#e7ebe2] px-3 py-2 dark:border-white/[0.15] dark:bg-[#172033]">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
        {position === 0 ? "I Semester" : "II Semester"}
        <span className="ml-2 text-[9px] font-semibold tracking-normal text-[#53605a] dark:text-gray-400">
          ({semester.semester})
        </span>
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
        SGPA
        <strong className="ml-1.5 text-[11px] text-[#17211e] dark:text-gray-100">
          {semester.semesterSGPA ?? "—"}
        </strong>
      </span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[430px] table-fixed border-collapse text-[#17211e] dark:text-gray-100">
        <colgroup>
          <col className="w-10" />
          <col />
          <col className="w-14" />
          <col className="w-14" />
          <col className="w-16" />
        </colgroup>
        <thead>
          <tr className="h-12 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
            <th className="border-b border-r border-[#2a342f] px-1 text-center dark:border-white/[0.15]">
              S.No.
            </th>
            <th className="border-b border-r border-[#2a342f] px-3 text-left dark:border-white/[0.15]">
              Subject Title
            </th>
            <th className="border-b border-r border-[#2a342f] px-1 text-center leading-tight dark:border-white/[0.15]">
              Grade Point
            </th>
            <th className="border-b border-r border-[#2a342f] px-1 text-center dark:border-white/[0.15]">
              Grade
            </th>
            <th className="border-b border-[#2a342f] px-1 text-center dark:border-white/[0.15]">
              Credits
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, subjectIndex) => {
            const subject = semester.subjects[subjectIndex] as
              | Record<string, any>
              | undefined;
            const grade = String(subject?.grades || "-").toUpperCase();
            return (
              <tr
                key={subject?.subjectCode || `empty-${subjectIndex}`}
                className="h-12 text-[11px] [&>td]:border-b [&>td]:border-[#7b867f] dark:[&>td]:border-white/10 last:[&>td]:border-b-0"
              >
                <td className="border-r px-1 text-center tabular-nums">
                  {subject ? subjectIndex + 1 : ""}
                </td>
                <td className="border-r px-3 py-2 font-medium uppercase leading-snug">
                  <span className="line-clamp-2">
                    {subject?.subjectName || ""}
                  </span>
                </td>
                <td className="border-r px-1 text-center font-semibold tabular-nums">
                  {subject ? (GRADE_POINTS[grade] ?? "-") : ""}
                </td>
                <td className="border-r px-1 text-center font-bold">
                  {subject ? grade : ""}
                </td>
                <td className="px-1 text-center tabular-nums">
                  {subject ? Number(subject.credits || 0).toFixed(1) : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

const CmmAcademicResult = ({ result }: { result: Record<string, any> }) => {
  const semesters = new Map<string, Record<string, any>>(
    result.semesters.map((semester: Record<string, any>) => [
      semester.semester,
      semester,
    ]),
  );

  return (
    <div className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]">
      {ACADEMIC_YEARS.map((year) => {
        const availableSemesters = year.semesters
          .map((code, position) => ({
            semester: semesters.get(code),
            position,
          }))
          .filter(
            (
              item,
            ): item is { semester: Record<string, any>; position: number } =>
              Boolean(item.semester),
          );

        if (availableSemesters.length === 0) return null;
        const rowCount = Math.max(
          ...availableSemesters.map(({ semester }) => semester.subjects.length),
        );

        return (
          <div
            key={year.label}
            className="border-b border-[#2a342f] last:border-b-0 dark:border-white/[0.15]"
          >
            <div className="border-b border-[#2a342f] bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold tracking-[0.2em] text-[#17211e] dark:border-white/[0.15] dark:bg-[#172033] dark:text-gray-100">
              {year.label}
            </div>
            <div
              className={`grid grid-cols-1 gap-1 bg-[#edf3e7] p-1 dark:bg-[#111827] ${
                availableSemesters.length === 2 ? "lg:grid-cols-2" : ""
              }`}
            >
              {availableSemesters.map(({ semester, position }) => (
                <div
                  key={semester.semester}
                  className="border border-[#2a342f] dark:border-white/[0.15]"
                >
                  <CmmSemesterTable
                    semester={semester}
                    position={position}
                    rowCount={rowCount}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const gradeConfig = (grade: string) => {
  if (!grade)
    return {
      bg: "bg-gray-100 dark:bg-white/10",
      text: "text-gray-500 dark:text-gray-400",
    };
  const g = grade.toUpperCase();
  if (g === "O")
    return {
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      text: "text-emerald-700 dark:text-emerald-400",
    };
  if (g === "A+")
    return {
      bg: "bg-blue-100 dark:bg-blue-900/40",
      text: "text-blue-700 dark:text-blue-400",
    };
  if (g === "A")
    return {
      bg: "bg-sky-100 dark:bg-sky-900/40",
      text: "text-sky-700 dark:text-sky-400",
    };
  if (g === "B+")
    return {
      bg: "bg-violet-100 dark:bg-violet-900/40",
      text: "text-violet-700 dark:text-violet-400",
    };
  if (g === "B")
    return {
      bg: "bg-purple-100 dark:bg-purple-900/40",
      text: "text-purple-700 dark:text-purple-400",
    };
  if (g === "C")
    return {
      bg: "bg-yellow-100 dark:bg-yellow-900/40",
      text: "text-yellow-700 dark:text-yellow-400",
    };
  if (g === "F")
    return {
      bg: "bg-red-100 dark:bg-red-900/40",
      text: "text-red-700 dark:text-red-400",
    };
  return {
    bg: "bg-gray-100 dark:bg-white/10",
    text: "text-gray-600 dark:text-gray-300",
  };
};

const AcademicResult = ({
  result,
  academic = false,
  cmm = false,
}: AcademicResultProps) => {
  if (academic || cmm) return <CmmAcademicResult result={result} />;

  return (
    <div className="flex flex-col gap-6">
      {result.semesters.map((semester: Record<string, any>, index: number) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm"
        >
          {/* ── Semester header ── */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0b3954] dark:bg-[#0b3954]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                {semester.semester}
              </h3>
            </div>
            {academic && !semester.failed && semester.semesterSGPA && (
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <span className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider">
                  SGPA
                </span>
                <span className="text-sm font-bold text-white">
                  {semester.semesterSGPA}
                </span>
              </div>
            )}
          </div>

          {/* ── Subject table ── */}
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
                  <th className="px-2.5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 border-none">
                    Code
                  </th>
                  <th
                    className="px-2.5 py-3 min-w-[420px] 2xl:min-w-[975px] hidden md:table-cell text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                    style={{ border: "none" }}
                  >
                    Subject Name
                  </th>
                  <th
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap"
                    style={{ border: "none" }}
                  >
                    Int.
                  </th>
                  <th
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap"
                    style={{ border: "none" }}
                  >
                    Ext.
                  </th>
                  <th
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap"
                    style={{ border: "none" }}
                  >
                    Total
                  </th>
                  <th
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                    style={{ border: "none" }}
                  >
                    Grade
                  </th>
                  <th
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500"
                    style={{ border: "none" }}
                  >
                    Cr.
                  </th>
                </tr>
              </thead>
              <tbody>
                {semester.subjects.map(
                  (subject: Record<string, any>, i: number) => {
                    const grade = gradeConfig(subject.grades);
                    const rowBg =
                      i % 2 === 0
                        ? "bg-white dark:bg-transparent"
                        : "bg-gray-50/80 dark:bg-white/[0.03]";

                    return (
                      <Fragment key={subject.subjectCode || i}>
                        {/* ── Main data row ── */}
                        <tr
                          key={`data-${i}`}
                          className={`transition-colors ${rowBg}`}
                        >
                          <td
                            className="px-2.5 py-2.5 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap"
                            style={{ border: "none" }}
                          >
                            {subject.subjectCode}
                          </td>
                          <td
                            className="px-2.5 py-2.5 min-w-[420px] hidden md:table-cell text-sm text-gray-700 dark:text-gray-200 min-w-[180px]"
                            style={{ border: "none" }}
                          >
                            {subject.subjectName}
                          </td>
                          <td
                            className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                            style={{ border: "none" }}
                          >
                            {subject.internalMarks || "—"}
                          </td>
                          <td
                            className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                            style={{ border: "none" }}
                          >
                            {subject.externalMarks || "—"}
                          </td>
                          <td
                            className="px-2.5 py-2.5 text-sm text-center font-semibold text-gray-800 dark:text-gray-100"
                            style={{ border: "none" }}
                          >
                            {subject.totalMarks || "—"}
                          </td>
                          <td
                            className="px-2.5 py-2.5 text-center"
                            style={{ border: "none" }}
                          >
                            <span
                              className={`inline-flex items-center justify-center min-w-[36px] px-2 py-0.5 rounded-md text-xs font-bold ${grade.bg} ${grade.text}`}
                            >
                              {subject.grades || "—"}
                            </span>
                          </td>
                          <td
                            className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                            style={{ border: "none" }}
                          >
                            {subject.credits}
                          </td>
                        </tr>

                        {/* ── Mobile-only: subject name as a full-width row below ── */}
                        <tr
                          key={`name-${i}`}
                          className={`md:hidden border-b border-gray-100 dark:border-white/5 ${rowBg}`}
                        >
                          <td
                            colSpan={6}
                            className="px-2.5 pb-2 pt-0 text-[11px] text-gray-500 dark:text-gray-400 italic leading-snug"
                            style={{ border: "none" }}
                          >
                            {subject.subjectName}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicResult;
