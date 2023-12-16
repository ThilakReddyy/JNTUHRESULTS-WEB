"use client";
import { useState } from "react";
import Loading from "@/components/loading/loading";

const ClassResult = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center  mt-[6%]  mx-[16%] px-10 rounded-md border-black dark:border-white border-2  shadow-2xl   ">
      <div className=" pt-[30px] pb-[50px]">
        <div className=" md:text-2xl  font-semibold flex justify-center ">
          <div className=" md:text-2xl  font-semibold   flex justify-center ">
            Class Results
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ClassResult;
