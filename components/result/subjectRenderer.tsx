import React from "react";

const gradeColor = (value: unknown) => {
  const grade = String(value || "")
    .trim()
    .toUpperCase();
  if (grade === "F") return "text-[#ff0000] dark:text-[#ff0000]";
  if (grade === "O") return "text-[#008000] dark:text-[#22c55e]";
  return "";
};

const Subjects = ({ semester }: { semester: Exam }) => (
  <div className="overflow-x-auto bg-[#edf3e7] dark:bg-[#111827]">
    <table className="w-full table-fixed border-collapse border-0 text-[#17211e] dark:text-gray-100 sm:min-w-[760px]">
      <colgroup>
        <col className="w-[35%] sm:w-28" />
        <col className="hidden sm:table-column" />
        <col className="w-[13%] sm:w-16" />
        <col className="w-[13%] sm:w-16" />
        <col className="w-[13%] sm:w-16" />
        <col className="w-[13%] sm:w-16" />
        <col className="w-[13%] sm:w-16" />
      </colgroup>
      <thead>
        <tr className="h-11 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
          <th className="border-b border-r border-[#2a342f] px-2 text-center dark:border-white/[0.15]">
            <span className="sm:hidden">Subject</span>
            <span className="hidden sm:inline">Subject Code</span>
          </th>
          <th className="hidden border-b border-r border-[#2a342f] px-2 text-center dark:border-white/[0.15] sm:table-cell">
            Subject Title
          </th>
          {[
            ["Internal", "Int."],
            ["External", "Ext."],
            ["Total", "Total"],
            ["Grade", "Grade"],
            ["Credits", "Cr."],
          ].map(([label, mobileLabel]) => (
            <th
              key={label}
              className="border-b border-r border-[#2a342f] px-0.5 text-center last:border-r-0 dark:border-white/[0.15] sm:px-2"
            >
              {mobileLabel}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {semester.subjects.map((subject: Record<string, any>, index: number) => (
          <tr
            key={subject.subjectCode || index}
            className="h-11 text-[11px] [&>td]:border-b [&>td]:border-r [&>td]:border-[#7b867f] last:[&>td]:border-b-0 dark:[&>td]:border-white/10"
          >
            <td className="px-2 text-center font-mono">
              <span className="text-sm font-semibold sm:text-[11px]">
                {subject.subjectCode}
              </span>
              <span className="mt-0.5 block text-[8px] font-medium uppercase leading-tight text-[#53605a] dark:text-gray-400 sm:hidden">
                {subject.subjectName}
              </span>
            </td>
            <td className="hidden px-3 py-2 font-medium uppercase leading-snug sm:table-cell">
              {subject.subjectName}
            </td>
            <td className="px-0.5 text-center tabular-nums sm:px-2">
              {subject.internalMarks || "—"}
            </td>
            <td className="px-0.5 text-center tabular-nums sm:px-2">
              {subject.externalMarks || "—"}
            </td>
            <td className="px-0.5 text-center font-semibold tabular-nums sm:px-2">
              {subject.totalMarks || "—"}
            </td>
            <td
              className={`px-0.5 text-center font-bold uppercase sm:px-2 ${gradeColor(subject.grades)}`}
            >
              {subject.grades || "—"}
            </td>
            <td className="border-r-0 px-0.5 text-center tabular-nums sm:px-2">
              {Number(subject.credits || 0).toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Subjects;
