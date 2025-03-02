"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import QuickNavigation from "@/components/navbar/quicknavigation";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";

const AcademicResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const academicResult = getFromLocalStorage(String(htno) + "-AcademicResult");
  if (academicResult === null) {
    router.push("/academicResult");
  }

  return academicResult === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <>
      <div className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]">
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">ACADEMIC RESULTS</div>
          <div className="justify-end flex "></div>
        </div>
        <ResultDetails details={academicResult.details} />
        <AcademicResult result={academicResult.results} academic={true} />
        <TotalResult
          CGPA={academicResult.results.CGPA}
          backlogs={academicResult.results.backlogs}
        />
      </div>
      <div className="flex justify-center text-[6px] text-black">
        jntuhresults.vercel.app
      </div>
      <QuickNavigation htno={htno} />
      {/* <Print componentRef={componentRef} /> */}
    </>
  );
};

export default AcademicResultResult;
