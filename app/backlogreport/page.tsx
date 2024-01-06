"use client";

import { useState } from "react";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";
import {
  fetchAcademicResult,
  getLocalStoragedata,
} from "@/components/api/fetchAcademicResult";
import { useRouter } from "next/navigation";

const BacklogReport = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setLoading(true);

    try {
      const localStorageResult = getLocalStoragedata(hallticketno);
      if (localStorageResult !== null) {
        router.push("backlogreport/result?htno=" + hallticketno);
        if (Date.now() < localStorageResult["expiry"]) {
          return;
        }
      }
      const result = await fetchAcademicResult(hallticketno);
      if (result !== null && result !== undefined) {
        router.push("/backlogreport/result?htno=" + hallticketno);
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
    <Form
      onSubmit={onSubmit}
      title="Backlog Report"
      hallticketno={hallticketno}
      sethallticketno={sethallticketno}
    />
  );
};
export default BacklogReport;
