"use client";
import ResultDetails from "@/components/result/details";
import ResultResults from "@/components/result/results";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ClassResultResult = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any>(null);
  const router = useRouter();
  const roll_key = searchParams.get("roll_key");
  console.log(roll_key);
  useEffect(() => {
    const getResults = () => {
      const result = localStorage.getItem(String(roll_key));
      if (result !== null) {
        setResults(JSON.parse(result));
      }
    };
    setInterval(getResults, 2000);
  }, [roll_key]);
  localStorage.getItem(String(roll_key));
  if (localStorage.getItem(String(roll_key)) === null) {
    toast.error("Internal Server Error");
    router.push("/classresult");
  }
  return results === null ? (
    <div className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%] text-center font-bold my-5  text-xs lg:text-2xl">
      Loading. Kindly Wait!!!
    </div>
  ) : (
    <div className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-5 text-xs lg:text-2xl justify-center flex">
        CLASS RESULTS
      </div>
      {results?.map((result: any, index: number) => {
        return (
          <div key={index}>
            {/* <ResultDetails Details={result["Details"]} /> */}
            <ResultResults Results={result["Results"]} />
          </div>
        );
      })}
    </div>
  );
};

export default ClassResultResult;
