import axios from "axios";
import { saveToLocalStorage } from "../customfunctions/localStorage";

import toast from "react-hot-toast";

export const fetchAcademicResult = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getAcademicResult?rollNumber=${htno}`;

    toast.loading("Result are been fetched");
    const response = await axios.get(url, { timeout: 20 * 1000 });
    if ("details" in response.data) {
      saveToLocalStorage(
        htno + "-AcademicResult",
        JSON.stringify(response.data),
      );
      toast.dismiss();
      return true;
    }
    if (response.data.status === "success") {
      toast.dismiss();
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.dismiss();
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.error("SERVER ISSUE!!");
  }
};

export const fetchAllResult = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

    url = `${url}api/getAllResult?rollNumber=${htno}`;

    toast.loading("Results are being fetched");

    const response = await axios.get(url, { timeout: 20 * 1000 });
    if ("details" in response.data) {
      saveToLocalStorage(htno + "-AllResult", JSON.stringify(response.data));
      toast.dismiss();
      return true;
    }
    if (response.data.status === "success") {
      toast.dismiss();
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.dismiss();
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.error("SERVER ISSUE!!");
  }
};

export const fetchBacklogReport = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getBacklogs?rollNumber=${htno}`;

    const response = await axios.get(url, { timeout: 20 * 1000 });
    if ("details" in response.data) {
      saveToLocalStorage(
        htno + "-Backlogreport",
        JSON.stringify(response.data),
      );
      return true;
    }
    if (response.data.status === "success") {
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.error("SERVER ISSUE!!");
  }
};
