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
    <div className="flex flex-col gap-2">
      {results.map((semester: Semester, index: number) => {
        return (
          <div key={index}>
            <table className="dark:border-white w-[100%] rounded-t">
              <tbody>
                <tr>
                  <th className="bg-gray-200 md:bg-gray-300  dark:border-white dark:bg-[#0b3954]">
                    {semester.semester} Results
                  </th>
                </tr>
              </tbody>
            </table>
            {semester.exams.map((exam: Exam, index: number) => {
              return (
                <div key={index}>
                  <table className="dark:border-white dark:bg-gray-900">
                    <tbody>
                      <tr>
                        <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                          Exam Code: {exam.examCode}
                        </th>
                        {(exam.rcrv || exam.graceMarks) && (
                          <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                            Result Type: {exam.rcrv ? "RC/RV" : "Grace Marks"}
                          </th>
                        )}
                        <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                          <a
                            href={`http://results.jntuh.ac.in/results/resultAction?degree=${htno?.[5] === "R" ? "bpharmacy" : "btech"}&examCode=${exam.examCode.replace("[RCRV]", "")}&etype=r16&result=${exam.rcrv ? "gradercrv" : "null"}&grad=null&type=${exam.rcrv ? "rcrvintgrade" : "intgrade"}&htno=${htno}`}
                            target="_blank"
                            className="underline"
                          >
                            Direct Link
                          </a>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <Subjects
                    semester={exam}
                    lastIndex={semester.exams.length == index + 1}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AcademicAllResult;
