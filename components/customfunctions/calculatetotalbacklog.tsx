export function calculatetotalbacklog(result: any) {
  // Define a type for the gradeMapper object
  var backlogs = 0;
  Object.keys(result).forEach((semester) => {
    if (typeof result[semester] === "object") {
      backlogs += result[semester]["backlog"];
    }
  });

  return backlogs;
}
