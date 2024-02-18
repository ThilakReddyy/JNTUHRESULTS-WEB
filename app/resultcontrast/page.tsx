"use client";

import Form from "@/components/forms/resulthtnoform";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  fetchAcademicResult,
  getLocalStoragedata,
} from "@/components/api/fetchAcademicResult";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
import Footer from "@/components/footer/footer";

const ResultContrast = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [hallticketno, sethallticketno] = useState("");
  const [hallticketno2, sethallticketno2] = useState("");
  const onSubmit = async () => {
    if (hallticketno.length < 10 || hallticketno2.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setLoading(true);

    try {
      const localStorageResult = getLocalStoragedata(hallticketno);
      const localStorageResult2 = getLocalStoragedata(hallticketno2);
      if (localStorageResult !== null && localStorageResult2 != null) {
        if (
          Date.now() < localStorageResult["expiry"] &&
          Date.now() < localStorageResult2["expiry"]
        ) {
          return;
        }
      }
      const result = await fetchAcademicResult(hallticketno);
      const result2 = await fetchAcademicResult(hallticketno2);
      if (
        result !== null &&
        result !== undefined &&
        result !== 422 &&
        result2 !== null &&
        result !== undefined &&
        result2 !== 422
      ) {
        router.push(
          "/resultcontrast/result?htno=" +
            hallticketno +
            "&htno2=" +
            hallticketno2,
        );
      } else {
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
        title="Result Contrast"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        hallticketno2={hallticketno2}
        sethallticketno2={sethallticketno2}
        onSubmit={onSubmit}
      />
      <Footer />
    </>
  );
};
export default ResultContrast;
