"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Form from "@/components/forms/resulthtnoform";
import Footer from "@/components/footer/footer";

const WrappedPage = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function readClipboard() {
      try {
        const ua = navigator.userAgent.toLowerCase();
        if (!ua.includes("android") && !ua.includes("iphone")) return;
        const text = await navigator.clipboard.readText();
        if (text.length === 10 && ["18","19","20","21","22","23"].includes(text.slice(0,2)))
          sethallticketno(text);
      } catch {}
    }
    readClipboard();
  }, []);

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
