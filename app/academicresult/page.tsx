"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { fetchAcademicResult } from "@/components/api/fetchResults";
import { setupPush } from "@/customhooks/setupPush";
import { logger } from "@/lib/telemetry/logger";

const AcademicResult = () => {
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
      await setupPush(hallticketno);
      router.push("/academicresult/result?htno=" + hallticketno);
      // const result = await fetchAcademicResult(hallticketno);
      // if (result) {
      // }
    } catch (error) {
      logger.error("academicresult", error);
    }
    setLoading(false);
    setTimeout(() => {
      setIsCooldown(false);
      toast.dismiss();
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
