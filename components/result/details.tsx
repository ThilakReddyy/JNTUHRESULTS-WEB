import { branchDetails } from "@/constants/branchdetails";
import { collegedata } from "@/constants/colleges";
import React from "react";

interface ResultDetailsProps {
  details: Record<string, any>;
}

const ResultDetails = ({ details }: ResultDetailsProps) => {
  return (
    <>
      <table className="w-[100%] mt-2  border-black dark:border-white  rounded-t ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Name</th>
            <th className=" dark:border-white">Roll Number</th>
            <th className=" dark:border-white">College Code</th>
            <th className=" dark:border-white">Father Name</th>
          </tr>
          <tr>
            <th className=" dark:border-white">{details.name}</th>
            <th className=" dark:border-white">{details.rollNumber}</th>
            <th className=" dark:border-white">{details.collegeCode}</th>
            <th className=" dark:border-white">{details.fatherName}</th>
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
              {collegedata[details["collegeCode"]]}
            </th>
            <th key="branch_detail" className=" dark:border-white">
              {branchDetails[details["rollNumber"].substring(6, 8)]}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ResultDetails;
