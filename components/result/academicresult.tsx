const AcademicResult = ({ result, academic = false }: AcademicResultProps) => {
  return (
    <div className="flex flex-col gap-2">
      {result.semesters.map((semester: Record<string, any>, index: number) => {
        return (
          <div key={index}>
            <table className="dark:border-white w-[100%] rounded-t">
              <tbody>
                <tr>
                  <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                    {semester.semester} Results
                  </th>
                </tr>
              </tbody>
            </table>
            <table className="dark:border-white">
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
                          {subject.internalMarks == 0
                            ? ""
                            : subject.internalMarks}
                        </th>
                        <th className="dark:border-white px-1">
                          {subject.externalMarks == 0
                            ? ""
                            : subject.externalMarks}
                        </th>
                        <th className="dark:border-white px-1">
                          {subject.totalMarks == 0 ? "" : subject.totalMarks}
                        </th>
                        <th className="dark:border-white px-1">
                          {subject.grades}
                        </th>
                        <th className="dark:border-white px-1">
                          {subject.credits}
                        </th>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
            {academic && (
              <table className="dark:border-white rounded-b">
                <tbody>
                  <tr>
                    <th className="dark:border-white w-[75%]">SGPA</th>
                    <th className="dark:border-white w-[25%]">
                      {semester.failed ? "" : semester.semesterSGPA}
                    </th>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AcademicResult;
