"use client";
import { getLocalStoragedata } from "@/components/api/fetchAcademicResult";
import { PerformanceAnalysis } from "@/components/customfunctions/performanceanalysis";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
  const htno = searchParams.get("htno")?.toUpperCase();
  const htno2 = searchParams.get("htno2")?.toUpperCase();
  const detailsFirst = getLocalStoragedata(String(htno));
  const detailsSecond = getLocalStoragedata(String(htno2));
  const semesters = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

  const { Details: detailsFirstData, Results: resultsFirstData } =
    detailsFirst?.value || {};
  const { Details: detailsSecondData, Results: resultsSecondData } =
    detailsSecond?.value || {};

  const performanceFirst = detailsFirstData ? PerformanceAnalysis(htno) : {};
  const performanceSecond = detailsSecondData ? PerformanceAnalysis(htno2) : {};

  useEffect(() => {
    if (detailsFirst === null || detailsSecond === null) {
      router.push("/resultcontrast");
    }
  }, [detailsFirst, detailsSecond, router]);

  return detailsSecond === null || detailsSecond === null ? (
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
            value1={detailsFirstData["NAME"]}
            value2={detailsSecondData["NAME"]}
          />
          <AttributeRow
            label="Roll No"
            value1={detailsFirstData["Roll_No"]}
            value2={detailsSecondData["Roll_No"]}
          />
          <AttributeRow
            label="College Code"
            value1={detailsFirstData["COLLEGE_CODE"]}
            value2={detailsSecondData["COLLEGE_CODE"]}
          />
          <AttributeRow
            label="Father's Name"
            value1={detailsFirstData["FATHER_NAME"]}
            value2={detailsSecondData["FATHER_NAME"]}
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
          {semesters.map((semester, index) => (
            <AttributeRow
              key={index}
              label={`${semester} CGPA | CREDITS`}
              value1={
                resultsFirstData[semester]?.CGPA
                  ? `${resultsFirstData[semester].CGPA} | ${resultsFirstData[semester].credits}`
                  : "-"
              }
              value2={
                resultsSecondData[semester]?.CGPA
                  ? `${resultsSecondData[semester].CGPA} | ${resultsSecondData[semester].credits}`
                  : "-"
              }
            />
          ))}
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
            value1={performanceFirst["CGPA" as keyof typeof performanceFirst]}
            value2={
              performanceSecond?.["CGPA" as keyof typeof performanceSecond]
            }
          />
          <AttributeRow
            label="Percentage"
            value1={
              performanceFirst["Percentage" as keyof typeof performanceFirst]
            }
            value2={
              performanceSecond?.[
                "Percentage" as keyof typeof performanceSecond
              ]
            }
          />
          <AttributeRow
            label="Credits Obtained"
            value1={
              performanceFirst["Credits" as keyof typeof performanceFirst]
            }
            value2={
              performanceSecond?.["Credits" as keyof typeof performanceSecond]
            }
          />
          <AttributeRow
            label="Backlogs"
            value1={
              performanceFirst["Backlogs" as keyof typeof performanceFirst]
            }
            value2={
              performanceSecond?.["Backlogs" as keyof typeof performanceSecond]
            }
          />
        </tbody>
      </table>
    </div>
  );
}

export default ResultContrastPage;
