"use client";
import React, { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
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
    <div className="mx-auto px-3 py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
      Details not found
    </div>
  ) : (
    <>
      <div
        className="mx-auto px-3 pb-6 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        {/* Page header */}
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            All Academic Results
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Complete Exam-wise Performance Record
          </p>
        </div>

        <ResultDetails details={allResult.details} />
        <AcademicAllResult
          results={allResult.results}
          htno={allResult.details.rollNumber}
        />

        <div className="flex justify-center text-[6px] text-gray-400 mt-4">
          jntuhresults.vercel.app
        </div>
      </div>

      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicAllResultResult;
