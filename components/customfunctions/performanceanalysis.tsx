import { getLocalStoragedata } from "../api/fetchAcademicResult";

function PerformanceAnalysis(htno: string | undefined) {
  const details = getLocalStoragedata(String(htno));

  if (details === null || details === undefined) {
    return {};
  }

  const calculatePercentage = (cgpa: string) =>
    cgpa !== "-" ? ((parseFloat(cgpa) - 0.5) * 10).toFixed(2) : "-";

  const calculateCredits = (results: any) =>
    Object.values(results).reduce(
      (total: any, semester: any) =>
        total +
        Object.values(semester).reduce((semesterTotal: any, subject: any) => {
          const credit = subject["subject_credits"];
          return semesterTotal + (credit !== undefined ? Number(credit) : 0);
        }, 0),
      0,
    );
  const backlogs: number = Object.values(details.value.Results).reduce(
    (totalBacklogs: number, semester: any): number =>
      totalBacklogs +
      Object.values(semester).filter((subject: any): boolean =>
        ["F", "Ab", "-"].includes(subject.subject_grade),
      ).length,
    0,
  );
  const { Results } = details.value;
  const CGPA = Results["Total"] || "-";

  const performance = {
    CGPA,
    Percentage: calculatePercentage(CGPA),
    Backlogs: backlogs,
    Credits: calculateCredits(Results),
  };

  return performance;
}

export { PerformanceAnalysis };
