"use client";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AttributeRowProps {
  label: string;
  value1?: string;
  value2?: string;
}
const AttributeRow: React.FC<AttributeRowProps> = ({
  label,
  value1,
  value2,
}) => (
  <tr className="w-max">
    <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white w-1/3">
      {label}
    </th>
    <th className="dark:border-white w-1/3">{value1}</th>
    <th className="dark:border-white w-1/3">{value2}</th>
  </tr>
);

function ResultContrastPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<CreditContrastReport | null>(null);
  useEffect(() => {
    toast.dismiss();
    const htno = searchParams.get("htno")?.toUpperCase();
    const htno2 = searchParams.get("htno2")?.toUpperCase();
    const localkey = htno + "-" + htno2 + "-CreditContrastreport";
    const results = getFromLocalStorage(localkey);
    setResults(results);
    if (results == null) {
      router.push("/resultcontrast");
      return;
    }
  }, [searchParams, router]);

  return results == null ? (
    <>
      <div className="m-1 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <div className="m-1 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-4 text-xs lg:text-2xl">
        Result Contrast
      </div>
      <table className="w-[100%] mt-2  border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Personal Details</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%]   border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          <AttributeRow
            label="Name"
            value1={results.studentProfiles[0]["name"]}
            value2={results.studentProfiles[1]["name"]}
          />
          <AttributeRow
            label="Roll No"
            value1={results.studentProfiles[0]["rollNumber"]}
            value2={results.studentProfiles[1]["rollNumber"]}
          />
          <AttributeRow
            label="College Code"
            value1={results.studentProfiles[0]["collegeCode"]}
            value2={results.studentProfiles[1]["collegeCode"]}
          />
          <AttributeRow
            label="Father's Name"
            value1={results.studentProfiles[0]["fatherName"]}
            value2={results.studentProfiles[1]["fatherName"]}
          />
        </tbody>
      </table>
      <table className="w-[100%] mt-4 border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Academic Results</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%] border-black dark:border-white">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          {results.semesters.map((semester, index: number) => {
            return (
              <AttributeRow
                key={index}
                label={`${semester[0].semester} -   CGPA | CREDITS `}
                value1={
                  semester[0].semesterCredits !== "-"
                    ? `${semester[0].semesterSGPA} | ${semester[0].semesterCredits}`
                    : "-"
                }
                value2={
                  semester[1].semesterCredits !== "-"
                    ? `${semester[1].semesterSGPA} | ${semester[0].semesterCredits}`
                    : "-"
                }
              />
            );
          })}
        </tbody>
      </table>
      <table className="w-[100%] mt-4 border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Performance Analysis</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%] border-black dark:border-white">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          <AttributeRow
            label="Total CGPA"
            value1={
              results.studentProfiles[0]["backlogs"] == "0"
                ? results.studentProfiles[0]["CGPA"]
                : "-"
            }
            value2={
              results.studentProfiles[1]["backlogs"] == "0"
                ? results.studentProfiles[1]["CGPA"]
                : "-"
            }
          />
          {/* <AttributeRow */}
          {/*   label="Percentage" */}
          {/*   value1={` ${((results.studentProfiles[0]["CGPA"]) - 0.5) * 10).toString()} %`} */}
          {/*   value2={` ${((results[1]["results"]["CGPA"] - 0.5) * 10).toString()} %`} */}
          {/* /> */}
          <AttributeRow
            label="Credits Obtained"
            value1={results.studentProfiles[0]["credits"]}
            value2={results.studentProfiles[1]["credits"]}
          />
          <AttributeRow
            label="Backlogs"
            value1={results.studentProfiles[0]["backlogs"]}
            value2={results.studentProfiles[1]["backlogs"]}
          />
        </tbody>
      </table>
    </div>
  );
}

export default ResultContrastPage;
