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
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const fetchData = async (htno: string, url: string) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    if (response.status == 200) {
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
    console.log(error);
    return null;
  }
};

export const getLocalStoragedata = (htno: string, backlog: boolean = false) => {
  try {
    const storageData = localStorage.getItem(htno);
    if (storageData !== null) {
      const data = JSON.parse(storageData);

      if (backlog === true) {
        const semesters = data.value["Results"];
        for (let semester in semesters) {
          const subjects = semesters[semester];
          if (typeof subjects === "object") {
            for (let subject in subjects) {
              if (
                !["F", "Ab", "-"].includes(subjects[subject]["subject_grade"])
              ) {
                delete subjects[subject];
              }
            }
            if (Object.keys(subjects).length === 0) {
              delete semesters[semester];
            }
          }
        }
      }
      if (backlog === true && data.value["Results"]["Total"]) {
        delete data.value["Results"]["Total"];
      }
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
  const primaryUrl = `https://jntuhresults.up.railway.app/api/academicresult?htno=${htno}`;
  response = await fetchData(htno, primaryUrl);
  if (response !== null) {
    return response;
  }

  return null;
}
