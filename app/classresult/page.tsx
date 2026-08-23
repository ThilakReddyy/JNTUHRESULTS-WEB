"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
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
      router.push("/classresult/result?htno=" + hallticketno);
    } catch (error) {
      logger.error("classresult", error);
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
        title="Class Result"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />
      <div className="flex justify-center text-xs text-red-400 py-2">
        <p>Disclaimer: Not yet fully updated to use this. </p>
      </div>{" "}
      <Footer />
    </>
  );
};
export default AcademicResult;
