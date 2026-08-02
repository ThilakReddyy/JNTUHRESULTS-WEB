import React from "react";

const Subjects = ({ semester }: { semester: Exam }) => (
  <div className="overflow-x-auto bg-[#edf3e7] dark:bg-[#111827]">
    <table className="min-w-[760px] table-fixed border-collapse border-0 text-[#17211e] dark:text-gray-100">
      <colgroup>
        <col className="w-28" />
        <col />
        <col className="w-16" />
        <col className="w-16" />
        <col className="w-16" />
        <col className="w-16" />
        <col className="w-16" />
      </colgroup>
      <thead>
        <tr className="h-11 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
          {[
            "Code",
            "Subject Title",
            "Internal",
            "External",
            "Total",
            "Grade",
            "Credits",
          ].map((label) => (
            <th
              key={label}
              className="border-b border-r border-[#2a342f] px-2 text-center last:border-r-0 dark:border-white/[0.15]"
            >
              {label}
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
            <td className="px-2 text-center font-mono font-semibold">
              {subject.subjectCode}
            </td>
            <td className="px-3 py-2 font-medium uppercase leading-snug">
              {subject.subjectName}
            </td>
            <td className="px-2 text-center tabular-nums">
              {subject.internalMarks || "—"}
            </td>
            <td className="px-2 text-center tabular-nums">
              {subject.externalMarks || "—"}
            </td>
            <td className="px-2 text-center font-semibold tabular-nums">
              {subject.totalMarks || "—"}
            </td>
            <td className="px-2 text-center font-bold uppercase">
              {subject.grades || "—"}
            </td>
            <td className="border-r-0 px-2 text-center tabular-nums">
              {Number(subject.credits || 0).toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Subjects;
