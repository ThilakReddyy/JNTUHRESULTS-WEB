import { branchDetails } from "@/constants/branchdetails";
import { collegedata } from "@/constants/colleges";
import React from "react";

interface ResultDetailsProps {
  Details: Record<string, any>;
}

const ResultDetails = ({ Details }: ResultDetailsProps) => {
  return (
    <>
      <table className="w-[100%] mt-2  border-black dark:border-white  rounded-t ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            {Object.keys(Details).map((value: string, index: number) => (
              <th key={index} className=" dark:border-white">
                {value}
              </th>
            ))}
          </tr>
          <tr>
            {Object.values(Details).map((value: any, index: number) => (
              <th key={index} className="dark:border-white">
                {value}
              </th>
            ))}
          </tr>
        </tbody>
      </table>
      <table className="w-[100%] mb-2   border-black dark:border-white  rounded-b ">
        <tbody>
          <tr className="">
            <th
              key="college_name_key"
              className=" dark:border-white max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]"
            >
              COLLEGE NAME
            </th>
            <th
              key="branch"
              className=" dark:border-white max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]"
            >
              BRANCH
            </th>
          </tr>
          <tr className="">
            <th key="college_name" className=" dark:border-white">
              {collegedata[Details["COLLEGE_CODE"]]}
            </th>
            <th key="branch_detail" className=" dark:border-white">
              {branchDetails[Details["Roll_No"].substring(6, 8)]}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ResultDetails;
