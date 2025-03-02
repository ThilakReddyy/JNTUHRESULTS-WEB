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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreditChecker = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hallticketno, sethallticketno] = useState<string>("");
  const router = useRouter();
  useEffect(() => {}, []);

  const onSubmit = async () => {
    toast("Service Temporarily down!!!");
    return;
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }
    if (hallticketno[5] !== "A") {
      toast("The Credits checker is limited to B.Tech degree");
      return;
    }

    setLoading(true);

    try {
      const localStorageResult = getLocalStoragedata(hallticketno);
      if (localStorageResult !== null) {
        router.push("creditchecker/result?htno=" + hallticketno);
        if (Date.now() < localStorageResult["expiry"]) {
          return;
        }
      }
      const result = await fetchAcademicallResult(hallticketno);
      if (result !== null && result !== undefined && result !== 422) {
        router.push("/creditchecker/result?htno=" + hallticketno);
      } else if (result === 422) {
        setLoading(false);
        toast.error("Jntuh Servers are down!!!");
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
        title="Credits Checker"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
      />
      <Footer />
    </>
  );
};

export default CreditChecker;
