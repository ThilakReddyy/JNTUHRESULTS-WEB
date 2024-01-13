"use client";
import { getLocalStoragedata } from "@/components/api/fetchClassResult";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import toast from "react-hot-toast";

const ClassResultResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefix_htnos = searchParams.get("prefix_htnos");
  const semester = searchParams.get("semester");
  console.log(semester);
  if (prefix_htnos) {
    const [regular, lateral] = prefix_htnos.split(",");
    if (semester === null) {
      router.push("/classresult");
      return;
    }
    const data = getLocalStoragedata(regular + semester);
    console.log(data);
  } else {
    toast.error("Internal Server Error");
    router.push("/classresult");
  }
  return <div>ClassResultResult</div>;
};

export default ClassResultResult;
