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
    <div className="flex flex-col gap-6">
      {results.map((semester: Semester, index: number) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm"
        >
          {/* ── Semester header ── */}
          <div className="flex items-center px-4 py-3 bg-[#0b3954]">
            <span className="w-2 h-2 rounded-full bg-sky-400 inline-block mr-2" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              {semester.semester}
            </h3>
          </div>

          {/* ── Exams within the semester ── */}
          {semester.exams.map((exam: Exam, examIndex: number) => (
            <div key={examIndex}>
              {/* Exam sub-header */}
              <div className="flex flex-wrap items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Exam Code:{" "}
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    {exam.examCode}
                  </span>
                </span>

                {(exam.rcrv || exam.graceMarks) && (
                  <span className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
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
                  className="ml-auto text-[10px] font-semibold text-sky-600 dark:text-sky-400 underline underline-offset-2 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
                >
                  JNTUH Direct Link ↗
                </a>
              </div>

              {/* Subject table */}
              <Subjects
                semester={exam}
                lastIndex={semester.exams.length === examIndex + 1}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AcademicAllResult;
