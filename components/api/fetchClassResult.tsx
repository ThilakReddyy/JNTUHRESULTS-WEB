import axios from "axios";

const fetchData = async (key: string, url: string) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    if (response.status == 200 && typeof response.data === "object") {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 1);
      const dataToStore = {
        value: response.data,
        expiry: expiryDate.getTime(),
      };
      localStorage.setItem(key, JSON.stringify(dataToStore));
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLocalStoragedata = (key: string) => {
  try {
    console.log(key);
    const storageData = localStorage.getItem(key);
    console.log(storageData);
    if (storageData !== null) {
      try {
        const data = JSON.parse(storageData);
        return data;
      } catch (error) {
        return storageData;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setLocalStoragedata = (key: string, value: string) => {
  try {
    const storageData = getLocalStoragedata(key);
    if (storageData !== null) {
      const data = JSON.parse(storageData);
      console.log(typeof data);
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export async function fetchClassResult(htnos: string, semester_code: string) {
  //primary urls
  const primaryUrl = `http://jntuhresults.up.railway.app/api/classresult?semester=${semester_code}&htnos=${htnos}`;
  let response = await fetchData(htnos + semester_code, primaryUrl);
  if (response !== null) {
    return response;
  }

  return null;
}
