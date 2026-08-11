"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Form from "@/components/forms/resulthtnoform";
import Footer from "@/components/footer/footer";

const WrappedPage = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    if (isCooldown) return;
    if (hallticketno.length < 10) { toast.error("Hall ticket should be 10 characters"); return; }
    setIsCooldown(true);
    router.push(`/wrapped/result?htno=${hallticketno}`);
    setTimeout(() => setIsCooldown(false), 10000);
  };

  return (
    <>
      <Form
        title="JNTUH Wrapped"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />
      <Footer />
    </>
  );
};

export default WrappedPage;
