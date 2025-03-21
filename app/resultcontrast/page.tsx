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
import { fetchCreditContrastReport } from "@/components/api/fetchResults";

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

    try {
      const result = await fetchCreditContrastReport(
        hallticketno,
        hallticketno2,
      );
      if (result) {
        router.push(
          "/resultcontrast/result?htno=" +
            hallticketno +
            "&htno2=" +
            hallticketno2,
        );
      }
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    } catch (error) {
      console.log("Error while fetching the academic result :", error);
    }
    setLoading(false);
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
        isDisabled={false}
      />
      <Footer />
    </>
  );
};
export default ResultContrast;
