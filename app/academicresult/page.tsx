"use client";

import {
  fetchAcademicResult,
  getLocalStoragedata,
} from "@/components/api/fetchAcademicResult";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AcademicResult = () => {
  const [hallticketno, sethallticketno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {}, []);

  const onSubmit = async () => {
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setLoading(true);

    try {
      const localStorageResult = getLocalStoragedata(hallticketno);
      if (localStorageResult !== null) {
        router.push("academicresult/result?htno=" + hallticketno);
        if (Date.now() < localStorageResult["expiry"]) {
          return;
        }
      }
      const result = await fetchAcademicResult(hallticketno);
      console.log(result);
      if (result !== null && result !== undefined) {
        console.log(typeof result);
        router.push("/academicresult/result?htno=" + hallticketno);
      } else {
        console.log("hoegoa");
        setLoading(false);
        toast.error("Internal server Error!!");
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
    </>
  );
};
export default AcademicResult;
