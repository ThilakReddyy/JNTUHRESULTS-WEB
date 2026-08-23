"use client";

import { useState } from "react";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { logger } from "@/lib/telemetry/logger";

const BacklogReport = () => {
  const [hallticketno, sethallticketno] = useState("");
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
      router.push("/backlogreport/result?htno=" + hallticketno);
    } catch (error) {
      logger.error("backlogreport", error);
    }
    setLoading(false);
    toast.dismiss();
    setTimeout(() => {
      setIsCooldown(false);
    }, 10000);
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
        isDisabled={isCooldown}
      />

      <Footer />
    </>
  );
};
export default BacklogReport;
