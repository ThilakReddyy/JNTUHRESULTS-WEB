import React from "react";

const Subjects = ({
  semester,
  lastIndex = true,
}: {
  semester: Exam;
  lastIndex: Boolean;
}) => {
  return (
    <table className={`dark:border-white ${lastIndex ? "rounded-b" : ""}`}>
      <tbody>
        <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954]">
          <th className="dark:border-white px-1">Subject Code</th>
          <th className="dark:border-white px-1">Subject Name</th>
          <th className="dark:border-white px-1">Internal</th>
          <th className="dark:border-white px-1">External</th>
          <th className="dark:border-white px-1">Total</th>
          <th className="dark:border-white px-1">Grade</th>
          <th className="dark:border-white px-1">Credits</th>
        </tr>
        {semester.subjects.map(
          (subject: Record<string, any>, index: number) => {
            return (
              <tr key={index}>
                <th className="dark:border-white px-1">
                  {subject.subjectCode}
                </th>
                <th className="dark:border-white px-1">
                  {subject.subjectName}
                </th>
                <th className="dark:border-white px-1">
                  {subject.internalMarks == 0 ? "" : subject.internalMarks}
                </th>
                <th className="dark:border-white px-1">
                  {subject.externalMarks == 0 ? "" : subject.externalMarks}
                </th>
                <th className="dark:border-white px-1">
                  {subject.totalMarks == 0 ? "" : subject.totalMarks}
                </th>
                <th className="dark:border-white px-1">{subject.grades}</th>
                <th className="dark:border-white px-1">{subject.credits}</th>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};

export default Subjects;
