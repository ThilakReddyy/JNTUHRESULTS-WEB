"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import QuickNavigation from "@/components/navbar/quicknavigation";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicAllResult from "@/components/result/academicallresult";
import Print from "@/components/download/print";

const AcademicAllResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");

  const componentRef = useRef(null);
  const allResult = getFromLocalStorage(String(htno) + "-AllResult");

  if (allResult === null) {
    router.push("/academicallresult");
  }

  return allResult === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <>
      <div
        className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">ACADEMIC All RESULTS</div>
          <div className="justify-end flex "></div>
        </div>

        <ResultDetails details={allResult.details} />
        <AcademicAllResult
          results={allResult.results}
          htno={allResult.details.rollNumber}
        />

        <div className="flex justify-center text-[6px] text-black">
          jntuhresults.vercel.app
        </div>
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicAllResultResult;
