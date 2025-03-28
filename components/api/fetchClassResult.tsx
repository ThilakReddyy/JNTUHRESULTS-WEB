import axios from "axios";

const fetchData = async (key: string, url: string) => {
  try {
    const response = await axios.get(url, { timeout: 7000 });
    if (response.status == 200 && typeof response.data === "object") {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 1);

      const dataToStore = {
        value: response.data,
        expiry: expiryDate.getTime(),
      };
      if (response.data.length === 0) {
        return response.data;
      }
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
    const storageData = localStorage.getItem(key);
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
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const updateLocalStoragedata = (key: string, value: string) => {
  try {
    const storageData = getLocalStoragedata(key);
    if (storageData !== null) {
      const newone = storageData.concat(value);
      setLocalStoragedata(key, newone);
    } else {
      setLocalStoragedata(key, value);
    }
  } catch (error) {
    console.log(error);
  }
};

export async function fetchClassResult(htnos: string, semester_code: string) {
  //primary urls
  const primaryUrl = `https://jntuhresults.up.railway.app/api/classresult?semester=${semester_code}&htnos=${htnos}`;
  // const primaryUrl = `http://localhost:8000/api/classresult?semester=${semester_code}&htnos=${htnos}`;
  let response = await fetchData(htnos + semester_code, primaryUrl);
  if (response !== null) {
    return response;
  }

  return null;
}
