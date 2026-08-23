"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { logger } from "@/lib/telemetry/logger";

const AcademicAllResult = () => {
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
      router.push("/academicallresult/result?htno=" + hallticketno);
    } catch (error) {
      logger.error("academicallresult", error);
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
