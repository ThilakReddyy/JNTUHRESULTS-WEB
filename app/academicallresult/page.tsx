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

    toast.loading("Result are been fetched");
    await sleep(1.5);
    try {
      const result = await fetchAllResult(hallticketno);
      toast.dismiss();
      if (result) {
        router.push("/academicallresult/result?htno=" + hallticketno);
      } else {
        toast.loading("Hallticket has been queued!!!");
        await sleep(1.5);
      }
    } catch (error) {
      console.log("Error while fetching the academic result :", error);
    }
    setLoading(false);
    toast.dismiss();
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
