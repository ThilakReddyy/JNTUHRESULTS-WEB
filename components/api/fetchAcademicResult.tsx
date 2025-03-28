import axios from "axios";

async function getRedisData(htno: string) {
  try {
    const response = await axios.get(`/api/redisdata?htno=${htno}`);
    if (response.status === 200) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 1);
      const dataToStore = {
        value: response.data,
        expiry: expiryDate.getTime(),
      };
      localStorage.setItem(htno, JSON.stringify(dataToStore));
      return response.data;
    } else if (response.status !== 200) {
      console.log(response.status);
    }
    return null;
  } catch (error) {
    return null;
  }
}
const grades_to_gpa: { [key: string]: number } = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  D: 5,
  F: 0,
  Ab: 0,
  "-": 0,
};
const fetchData = async (htno: string, url: string) => {
  try {
    const response = await axios.get(url, { timeout: 7000 });
    console.log(response);
    if (response.status == 200 && typeof response.data === "object") {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 1);
      const dataToStore = {
        value: response.data,
        expiry: expiryDate.getTime(),
      };
      localStorage.setItem(htno, JSON.stringify(dataToStore));
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return 422;
    }
    return null;
  }
};

export const getLocalStoragedata = (htno: string, backlog: boolean = false) => {
  try {
    const storageData = localStorage.getItem(htno);
    if (storageData !== null) {
      const data = JSON.parse(storageData);
      const collegeName = data.value["Details"]["COLLEGE_CODE"];
      var backlogs = 0;
      const semesters = data.value["Results"];
      for (let semester in semesters) {
        const subjects = semesters[semester];
        var semester_backlogs = 0;
        if (typeof subjects === "object") {
          for (let subject in subjects) {
            if (
              !["F", "Ab", "-"].includes(subjects[subject]["subject_grade"])
            ) {
              if (backlog) {
                delete subjects[subject];
              }
            } else {
              backlogs += 1;
              semester_backlogs += 1;
            }
          }
          if (Object.keys(subjects).length === 0) {
            delete semesters[semester];
          }
          subjects["backlog"] = semester_backlogs;
        }
      }
      if (backlog && data.value["Results"]["Total"]) {
        delete data.value["Results"]["Total"];
      }
      data.value["Backlogs"] = backlogs;
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function fetchAcademicResult(htno: string) {
  //Redis Data
  let response = await getRedisData(htno);
  if (response != null) {
    return response;
  }

  //primary urls
  const urls = [
    "https://jntuhresults.up.railway.app/api/academicresult?htno=",
    "/api/academicresult?htno=",
    "http://localhost:8000/api/academicresult?htno=",
    "/api/academicresult?htno=",
    "https://jntuhresultss.vercel.app/api/academicresult?htno=",
    "https://jntuhresultsss.vercel.app/api/academicresult?htno=",
  ];
  // console.log("came here");
  // const primaryUrl = urls[2] + htno;
  // response = await fetchData(htno, primaryUrl);
  // console.log(response);
  // if (response !== null) {
  //   console.log(response);
  //   return response;
  // }
  // //Rechecking Redis Data
  // response = await getRedisData(htno);
  // if (response != null) {
  //   return response;
  // }
  const secondaryUrl = urls[0] + htno;
  response = await fetchData(htno, secondaryUrl);
  console.log(response);
  if (response !== null) {
    console.log(response);
    return response;
  }
  //Rechecking Redis Data
  response = await getRedisData(htno);
  if (response != null) {
    return response;
  }
  return null;
}

interface Subject {
  subject_code: string;
  subject_name: string;
  subject_internal: string;
  subject_external: string;
  subject_total: string;
  subject_grade: string;
  subject_credits: string;
}

interface ExamResults {
  [examCode: string]: Array<{
    [subjectCode: string]: Subject;
  }>;
}

interface Results {
  [semester: string]: ExamResults;
}

interface AcademicResult {
  Details: any;
  Results: Results;
}

function computationAcademicResult(result: AcademicResult) {
  const results = result.Results;
  const semesterKeys = Object.keys(results);
  const academicResults: {
    [semester: string]: { [subjectCode: string]: Subject | number };
  } = {};

  for (const semesterKey of semesterKeys) {
    academicResults[semesterKey] = {};
    const examCodeResults = Object.values(results[semesterKey]);
    examCodeResults.forEach((examCodeResultArray) => {
      examCodeResultArray.forEach((subjects) => {
        const subjectKeys = Object.keys(subjects);
        subjectKeys.forEach((subjectKey) => {
          if (subjectKey in academicResults[semesterKey]) {
            const prevSubjectGrade = (
              academicResults[semesterKey][subjectKey] as Subject
            ).subject_grade;

            if (
              grades_to_gpa[prevSubjectGrade] <=
              grades_to_gpa[subjects[subjectKey]["subject_grade"]]
            ) {
              academicResults[semesterKey][subjectKey] = subjects[subjectKey];
            }
          } else {
            academicResults[semesterKey][subjectKey] = subjects[subjectKey];
          }
        });
      });
    });
  }
  Object.keys(academicResults).forEach((semesterKey) => {
    var totalCredits = 0;
    Object.values(academicResults[semesterKey]).forEach((subjectValue) => {
      if (typeof subjectValue !== "number") {
        totalCredits += parseFloat((subjectValue as Subject).subject_credits);
      }
    });
    academicResults[semesterKey]["credits"] = totalCredits;
  });
  const academicresult = { Details: result.Details, Results: academicResults };
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 1);
  const dataToStore = {
    value: academicresult,
    expiry: expiryDate.getTime(),
  };
  localStorage.setItem(result.Details["Roll_No"], JSON.stringify(dataToStore));
}

export async function fetchAcademicallResult(htno: string) {
  const result = await getRedisData(htno + "ALL");
  if (result != null) {
    computationAcademicResult(result);

    return result;
  }

  const url =
    "https://jntuhresults.up.railway.app/api/academicallresult?htno=" + htno;
  try {
    const response = await axios.get(url, { timeout: 20 * 1000 });

    if (response.status == 200 && typeof response.data === "object") {
      computationAcademicResult(response.data);
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return 422;
    }
    return null;
  }
}
