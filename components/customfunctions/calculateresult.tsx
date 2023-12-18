export function calculateResult(result: any) {
  // Define a type for the gradeMapper object
  type GradeMapper = {
    [key: string]: number;
  };

  const gradeMapper: GradeMapper = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
    P: 0,
    Ab: 0,
    "-": 0,
  };
  let failedClass = false;
  Object.keys(result).forEach((semester) => {
    if (
      typeof result[semester] === "object" &&
      !Array.isArray(result[semester])
    ) {
      let totalCredits = 0;
      let totalGradePoints = 0;
      let failed = false;
      Object.keys(result[semester]).forEach((subjectCode) => {
        const subject = result[semester][subjectCode];

        if (typeof subject === "object" && !Array.isArray(subject)) {
          const { subject_grade, subject_credits } = subject;

          if (subject_grade in gradeMapper) {
            const gradePoint = gradeMapper[subject_grade];
            const credits = parseFloat(subject_credits);
            // If grade point is 0 for any subject, set the entire CGPA to 0
            if (gradePoint === 0) {
              failed = true;
              failedClass = true;
            }
            totalGradePoints += gradePoint * credits;
            totalCredits += credits;
          }
        }
      });

      if (totalCredits > 0) {
        const CGPA = (totalGradePoints / totalCredits).toFixed(2);
        result[semester].total = totalGradePoints;
        result[semester].credits = totalCredits;
        result[semester].CGPA = CGPA;
      }
      if (failed) {
        delete result[semester]["CGPA"];
      }
    }
  });
  var total_credits = 0;
  var total_grades = 0;
  Object.keys(result).forEach((semester) => {
    if (typeof result[semester] === "object") {
      if (result[semester]["CGPA"] === undefined) {
        delete result["Total"];
        return;
      }
      total_credits += result[semester]["credits"];
      total_grades += result[semester]["total"];
    }
  });
  result["Total"] = (total_grades / total_credits).toFixed(2);
  if (failedClass) {
    delete result["Total"];
  }
  return result;
}
