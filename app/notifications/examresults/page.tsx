"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

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

const NotificationExamResults = () => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("query") || "";
  const htno = searchParams.get("htno");
  const title = searchParams.get("title");

  const storage: string =
    localStorage.getItem(htno + encodeURIComponent(query)) || "";
  const storageJson = JSON.parse(storage);

  if (title == null || htno === null || storage == null) return null;

  const results = Object.values(storageJson["Results"]) as any[];

  return (
    <div className="mx-auto max-w-3xl px-3 pb-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="font-extrabold text-lg lg:text-2xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase leading-snug">
          {title}
        </h1>
      </div>

      {/* Results table card */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0b3954]">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Subject-wise Results
          </h3>
        </div>

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
                {[
                  "Code",
                  "Subject Name",
                  "Int.",
                  "Ext.",
                  "Total",
                  "Grade",
                  "Cr.",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-2.5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 first:text-left"
                    style={{ border: "none" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result: any, i: number) => {
                const grade = gradeConfig(result["subject_grade"]);
                const rowBg =
                  i % 2 === 0
                    ? "bg-white dark:bg-transparent"
                    : "bg-gray-50/80 dark:bg-white/[0.03]";
                return (
                  <>
                    <tr key={`d-${i}`} className={`transition-colors ${rowBg}`}>
                      <td
                        className="px-2.5 py-2.5 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap"
                        style={{ border: "none" }}
                      >
                        {result["subject_code"]}
                      </td>
                      <td
                        className="px-2.5 py-2.5 hidden md:table-cell text-sm text-gray-700 dark:text-gray-200 min-w-[180px]"
                        style={{ border: "none" }}
                      >
                        {result["subject_name"]}
                      </td>
                      <td
                        className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                        style={{ border: "none" }}
                      >
                        {result["subject_internal"] || "—"}
                      </td>
                      <td
                        className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                        style={{ border: "none" }}
                      >
                        {result["subject_external"] || "—"}
                      </td>
                      <td
                        className="px-2.5 py-2.5 text-sm text-center font-semibold text-gray-800 dark:text-gray-100"
                        style={{ border: "none" }}
                      >
                        {result["subject_total"] || "—"}
                      </td>
                      <td
                        className="px-2.5 py-2.5 text-center"
                        style={{ border: "none" }}
                      >
                        <span
                          className={`inline-flex items-center justify-center min-w-[36px] px-2 py-0.5 rounded-md text-xs font-bold ${grade.bg} ${grade.text}`}
                        >
                          {result["subject_grade"] || "—"}
                        </span>
                      </td>
                      <td
                        className="px-2.5 py-2.5 text-sm text-center text-gray-600 dark:text-gray-300"
                        style={{ border: "none" }}
                      >
                        {result["subject_credits"]}
                      </td>
                    </tr>
                    {/* Mobile subject name row */}
                    <tr
                      key={`n-${i}`}
                      className={`md:hidden border-b border-gray-100 dark:border-white/5 ${rowBg}`}
                    >
                      <td
                        colSpan={6}
                        className="px-2.5 pb-2 pt-0 text-[11px] text-gray-500 dark:text-gray-400 italic leading-snug"
                        style={{ border: "none" }}
                      >
                        {result["subject_name"]}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationExamResults;
