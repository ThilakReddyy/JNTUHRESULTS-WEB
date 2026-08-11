"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/forms/resulthtnoform";
import Footer from "@/components/footer/footer";
import toast from "react-hot-toast";

const JourneyPage = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    if (isCooldown) return;
    if (hallticketno.length < 10) {
      toast.error("Hall ticket should be 10 characters");
      return;
    }
    setIsCooldown(true);
    router.push(`/journey/result?htno=${hallticketno}`);
    setTimeout(() => setIsCooldown(false), 10000);
  };

  return (
    <>
      <Form
        title="Your Academic Journey"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />
      <Footer />
    </>
  );
};

export default JourneyPage;
