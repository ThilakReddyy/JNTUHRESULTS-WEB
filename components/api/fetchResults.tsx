import axios from "axios";
import { saveToLocalStorage } from "../customfunctions/localStorage";
import toast from "react-hot-toast";

export const fetchAcademicResult = async (htno: string) => {
  let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
  url = `${url}api/getAcademicResult?rollNumber=${htno}`;

  const response = await axios.get(url, { timeout: 20 * 1000 });
  if ("details" in response.data) {
    saveToLocalStorage(htno + "-AcademicResult", JSON.stringify(response.data));
    return true;
  }
  if (response.data.status === "success") {
    toast(response.data.message);
  } else if (response.data.status === "failure") {
    toast.error(response.data.message);
  }

  console.log(response.data.status, response.data.messsage);
  console.log(response.data);
  return false;
};

export const fetchAllResult = async (htno: string) => {
  let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

  url = `${url}api/getAllResult?rollNumber=${htno}`;

  const response = await axios.get(url, { timeout: 20 * 1000 });
  if ("details" in response.data) {
    saveToLocalStorage(htno + "-AllResult", JSON.stringify(response.data));
    return true;
  }
  if (response.data.status === "success") {
    toast(response.data.message);
  } else if (response.data.status === "failure") {
    toast.error(response.data.message);
  }

  console.log(response.data);
  return false;
};

export const fetchBacklogReport = async (htno: string) => {
  let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
  url = `${url}api/getBacklogs?rollNumber=${htno}`;

  const response = await axios.get(url, { timeout: 20 * 1000 });
  if ("details" in response.data) {
    saveToLocalStorage(htno + "-Backlogreport", JSON.stringify(response.data));
    return true;
  }
  if (response.data.status === "success") {
    toast(response.data.message);
  } else if (response.data.status === "failure") {
    toast.error(response.data.message);
  }

  return false;
};
