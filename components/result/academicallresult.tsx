import React from "react";
import Subjects from "./subjectRenderer";

const AcademicAllResult = ({
  results,
  htno,
}: {
  results: StudentResults;
  htno: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {results.map((semester: Semester, index: number) => (
        <div
          key={index}
          className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]"
        >
          {/* ── Semester header ── */}
          <div className="border-b border-[#2a342f] bg-[#dce5d8] px-4 py-2 text-center dark:border-white/[0.15] dark:bg-[#172033]">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:text-gray-100">
              {semester.semester}
            </h3>
          </div>

          {/* ── Exams within the semester ── */}
          {semester.exams.map((exam: Exam, examIndex: number) => (
            <div
              key={examIndex}
              className="m-1 border border-[#2a342f] dark:border-white/[0.15]"
            >
              {/* Exam sub-header */}
              <div className="flex flex-wrap items-center gap-3 border-b border-[#2a342f] bg-[#e7ebe2] px-4 py-2 dark:border-white/[0.15] dark:bg-white/[0.04]">
                <span className="text-xs font-semibold text-[#53605a] dark:text-gray-400">
                  Exam Code:{" "}
                  <span className="font-bold text-[#17211e] dark:text-gray-100">
                    {exam.examCode}
                  </span>
                </span>

                {(exam.rcrv || exam.graceMarks) && (
                  <span className="border border-amber-600/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                    {exam.rcrv ? "RC / RV" : "Grace Marks"}
                  </span>
                )}

                <a
                  href={`http://results.jntuh.ac.in/results/resultAction?degree=${htno?.[5] === "R" ? "bpharmacy" : "btech"
                    }&examCode=${exam.examCode.replace("[RCRV]", "")}&etype=r16&result=${exam.rcrv ? "gradercrv" : "null"
                    }&grad=null&type=${exam.rcrv ? "rcrvintgrade" : "intgrade"
                    }&htno=${htno}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[10px] font-semibold text-primary underline underline-offset-2 transition-colors hover:opacity-70"
                >
                  JNTUH Direct Link ↗
                </a>
              </div>

              {/* Subject table */}
              <Subjects semester={exam} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AcademicAllResult;
