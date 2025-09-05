"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";
import Print from "@/components/download/print";

const ClassResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const type = useSearchParams().get("type");
  const [classResults, setClassResults] = useState<AcademicResulProps[]>([]);
  const componentRef = useRef(null);
  useEffect(() => {
    const academicResult = getFromLocalStorage(htno + "-ClassResult-" + type);
    setClassResults(academicResult);

    if (academicResult === null) {
      router.push("/classresult");
    }
  }, [htno, type, router]);

  return (
    <>
      <div
        className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">CLASS RESULTS</div>
          <div className="justify-end flex ">
            <div
              className="border border-white p-1 md:p-2 md:hidden rounded cursor-pointer justify-center items-center  hidden"
              onClick={() => {}}
            >
              <RefreshCcw size={6} />
            </div>
          </div>
        </div>
        {classResults.length != 0 ? (
          classResults.map((classresult: AcademicResulProps, index: number) => {
            return (
              <div key={index} className=" pb-8">
                <ResultDetails details={classresult.details} />
                <AcademicResult result={classresult.results} academic={true} />
                <TotalResult
                  CGPA={classresult.results.CGPA}
                  backlogs={classresult.results.backlogs}
                />
              </div>
            );
          })
        ) : (
          <>
            <ResultDetailsSkeleton />
            <AcademicResultSkeleton />
          </>
        )}
      </div>
      <div className="flex justify-center text-[6px] text-black">
        jntuhresults.vercel.app
      </div>
      <Print componentRef={componentRef} />
    </>
  );
};

export default ClassResultResult;
