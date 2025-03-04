"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { fetchAcademicResult } from "@/components/api/fetchResults";
import { sleep } from "@/components/customfunctions/timer";

const AcademicResult = () => {
  const [hallticketno, sethallticketno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);

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

  const onSubmit = async () => {
    if (isCooldown) return;
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setIsCooldown(true);
    toast.loading("Result are been fetched");
    try {
      const result = await fetchAcademicResult(hallticketno);
      toast.dismiss();
      if (result) {
        router.push("/academicresult/result?htno=" + hallticketno);
      }
    } catch (error) {
      console.log("Error while fetching the academic result :", error);
    }
    setLoading(false);
    toast.dismiss();
    setTimeout(() => {
      setIsCooldown(false);
    }, 10000);
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
        isDisabled={isCooldown}
      />
      <Footer />
    </>
  );
};
export default AcademicResult;
