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

const AcademicAllResult = () => {
  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

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
      const localStorageResult = getLocalStoragedata(hallticketno + "all");
      if (localStorageResult !== null) {
        router.push("academicallresult/result?htno=" + hallticketno);
        if (Date.now() < localStorageResult["expiry"]) {
          return;
        }
      }
      const result = await fetchAcademicallResult(hallticketno);
      if (result !== null && result !== undefined && result !== 422) {
        console.log(result);
        router.push("/academicallresult/result?htno=" + hallticketno);
      } else if (result === 422) {
        setLoading(false);
        toast.error("Jntuh Servers are down!!!");
      } else {
        setLoading(false);
        // toast.error("Jntuh Servers are down!!!");
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
        title="Academic All Results"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
      />
      <Footer />
    </>
  );
};
export default AcademicAllResult;
