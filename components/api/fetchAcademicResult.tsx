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
    "https://jntuhresultss.vercel.app/api/academicresult?htno=",
    "https://jntuhresultsss.vercel.app/api/academicresult?htno=",
  ];
  console.log("came here");
  const primaryUrl = urls[2] + htno;
  // const primaryUrl = `https://jntuhresults.up.railway.app/api/academicresult?htno=${htno}`;
  //const primaryUrl = `/api/academicresult?htno=${htno}`;
  // const primaryUrl = `https://jntuhresultsss.vercel.app/api/academicresult?htno=${htno}`;
  // const primaryUrl = `https://jntuhresultss.vercel.app/api/academicresult?htno=${htno}`;
  response = await fetchData(htno, primaryUrl);
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
