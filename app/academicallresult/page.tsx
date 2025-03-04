"use client";

import {
  fetchAcademicallResult,
  getLocalStoragedata,
} from "@/components/api/fetchAcademicResult";
import { fetchAllResult } from "@/components/api/fetchResults";
import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AcademicAllResult = () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [hallticketno, sethallticketno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (isCooldown) return;

    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setIsCooldown(true);

    try {
      const result = await fetchAllResult(hallticketno);
      toast.dismiss();
      if (result) {
        router.push("/academicallresult/result?htno=" + hallticketno);
      }
    } catch (error) {
      console.log("Error while fetching the academic result:", error);
    }

    setLoading(false);
    toast.dismiss();

    // Cooldown period (10 seconds)
    setTimeout(() => {
      setIsCooldown(false);
    }, 10000);
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
        isDisabled={isCooldown} // Pass this prop to disable button
      />
      <Footer />
    </>
  );
};

export default AcademicAllResult;
