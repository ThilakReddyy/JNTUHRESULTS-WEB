"use client";

import { useState } from "react";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { sleep } from "@/components/customfunctions/timer";
import {
  fetchAcademicResult,
  fetchBacklogReport,
} from "@/components/api/fetchResults";

const BacklogReport = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (hallticketno.length < 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    toast.loading("Result are been fetched");
    await sleep(1.5);
    try {
      const result = await fetchBacklogReport(hallticketno);
      toast.dismiss();
      if (result) {
        router.push("/backlogreport/result?htno=" + hallticketno);
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
        onSubmit={onSubmit}
        title="Backlog Report"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
      />

      <Footer />
    </>
  );
};
export default BacklogReport;
