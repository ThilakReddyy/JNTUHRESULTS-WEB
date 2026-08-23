"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { logger } from "@/lib/telemetry/logger";

const CreditChecker = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hallticketno, sethallticketno] = useState<string>("");
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
      router.push("/creditchecker/result?htno=" + hallticketno);
    } catch (error) {
      logger.error("creditchecker", error);
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
        title="Credits Checker"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={false}
      />
      <Footer />
    </>
  );
};

export default CreditChecker;
