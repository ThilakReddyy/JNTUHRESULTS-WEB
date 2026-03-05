import React from "react";

const gradeConfig = (grade: string) => {
  if (!grade) return { bg: "bg-gray-100 dark:bg-white/10", text: "text-gray-500 dark:text-gray-400" };
  const g = grade.toUpperCase();
  if (g === "O") return { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-400" };
  if (g === "A+") return { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-400" };
  if (g === "A") return { bg: "bg-sky-100 dark:bg-sky-900/40", text: "text-sky-700 dark:text-sky-400" };
  if (g === "B+") return { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-400" };
  if (g === "B") return { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-400" };
  if (g === "C") return { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-400" };
  if (g === "F") return { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-700 dark:text-red-400" };
  return { bg: "bg-gray-100 dark:bg-white/10", text: "text-gray-600 dark:text-gray-300" };
};

const Subjects = ({
  semester,
  lastIndex = true,
}: {
  semester: Exam;
  lastIndex: Boolean;
}) => {
  return (
    <div className="overflow-x-auto">
      <table style={{ borderCollapse: "collapse", borderSpacing: 0, border: "none", width: "100%" }}>
        <thead>
          <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <th className="px-2.5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500" style={{ border: "none" }}>
              Code
            </th>
            <th className="px-2.5 py-3 hidden md:table-cell text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500" style={{ border: "none" }}>
              Subject Name
            </th>
            <th className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap" style={{ border: "none" }}>
              Int.
            </th>
            <th className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap" style={{ border: "none" }}>
              Ext.
            </th>
            <th className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 whitespace-nowrap" style={{ border: "none" }}>
              Total
            </th>
            <th className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500" style={{ border: "none" }}>
              Grade
            </th>
            <th className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500" style={{ border: "none" }}>
              Cr.
            </th>
          </tr>
        </thead>
        <tbody>
          {semester.subjects.map((subject: Record<string, any>, i: number) => {
            const grade = gradeConfig(subject.grades);
            const rowBg = i % 2 === 0
              ? "bg-white dark:bg-transparent"
              : "bg-gray-50/80 dark:bg-white/[0.03]";
            return (
              <>
                {/* Main data row */}
                <tr key={`data-${i}`} className={`transition-colors ${rowBg}`}>
                  <td className="px-2.5 py-2.5 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap" style={{ border: "none" }}>
                    {subject.subjectCode}
                  </td>
                  <td className="px-2.5 py-2.5 hidden md:table-cell text-sm text-gray-700 dark:text-gray-200 min-w-[180px]" style={{ border: "none" }}>
                    {subject.subjectName}
                  </td>
                  <td className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300" style={{ border: "none" }}>
                    {subject.internalMarks || "—"}
                  </td>
                  <td className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300" style={{ border: "none" }}>
                    {subject.externalMarks || "—"}
                  </td>
                  <td className="px-2.5 py-2.5 text-sm text-center font-semibold text-gray-800 dark:text-gray-100" style={{ border: "none" }}>
                    {subject.totalMarks || "—"}
                  </td>
                  <td className="px-2.5 py-2.5 text-center" style={{ border: "none" }}>
                    <span className={`inline-flex items-center justify-center min-w-[36px] px-2 py-0.5 rounded-md text-xs font-bold ${grade.bg} ${grade.text}`}>
                      {subject.grades || "—"}
                    </span>
                  </td>
                  <td className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300" style={{ border: "none" }}>
                    {subject.credits}
                  </td>
                </tr>

                {/* Mobile-only: subject name row below */}
                <tr key={`name-${i}`} className={`md:hidden border-b border-gray-100 dark:border-white/5 ${rowBg}`}>
                  <td
                    colSpan={6}
                    className="px-2.5 pb-2 pt-0 text-[11px] text-gray-500 dark:text-gray-400 italic leading-snug"
                    style={{ border: "none" }}
                  >
                    {subject.subjectName}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;
