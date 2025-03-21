"use client";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [results, setResults] = useState<AcademicResulProps[] | null>(null);
  useEffect(() => {
    const htno = searchParams.get("htno")?.toUpperCase();
    const htno2 = searchParams.get("htno2")?.toUpperCase();
    const localkey = htno + "-" + htno2 + "-CreditContrastreport";
    const results = getFromLocalStorage(localkey);
    setResults(results);
    if (results == null) {
      router.push("/resultcontrast");
    }
    const semester1 = results[0]["results"]["semesters"];
    const semester2 = results[1]["results"]["semesters"];
    const semesters: any = {};
    if (semester1.length > semester2.length) {
      for (const semester of semester1) {
        semesters[semester["semester"]] = [semester, null];
      }
      for (const semester of semester2) {
        semesters[semester["semester"]][1] = semester;
      }
    } else {
      for (const semester of semester2) {
        semesters[semester["semester"]] = [null, semester];
      }
      for (const semester of semester1) {
        semesters[semester["semester"]][0] = semester;
      }
    }
    console.log(semesters);
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
            value1={results[0]["details"]["name"]}
            value2={results[1]["details"]["name"]}
          />
          <AttributeRow
            label="Roll No"
            value1={results[0]["details"]["rollNumber"]}
            value2={results[1]["details"]["rollNumber"]}
          />
          <AttributeRow
            label="College Code"
            value1={results[0]["details"]["collegeCode"]}
            value2={results[1]["details"]["collegeCode"]}
          />
          <AttributeRow
            label="Father's Name"
            value1={results[0]["details"]["fatherName"]}
            value2={results[1]["details"]["fatherName"]}
          />
        </tbody>
      </table>
      {/* <table className="w-[100%] mt-4 border-black dark:border-white   "> */}
      {/*   <tbody> */}
      {/*     <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]"> */}
      {/*       <th className=" dark:border-white">Academic Results</th> */}
      {/*     </tr> */}
      {/*   </tbody> */}
      {/* </table> */}
      {/* <table className="w-[100%] border-black dark:border-white"> */}
      {/*   <tbody> */}
      {/*     <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]"> */}
      {/*       <th className=" dark:border-white w-1/3">Student Attribute</th> */}
      {/*       <th className=" dark:border-white w-1/3">Student 1</th> */}
      {/*       <th className=" dark:border-white w-1/3">Student 2</th> */}
      {/*     </tr> */}
      {/* {semesters.map((semester, index) => ( */}
      {/*   <AttributeRow */}
      {/*     key={index} */}
      {/*     label={`${semester} CGPA | CREDITS`} */}
      {/*     value1={ */}
      {/*       resultsFirstData[semester]?.CGPA */}
      {/*         ? `${resultsFirstData[semester].CGPA} | ${resultsFirstData[semester].credits}` */}
      {/*         : "-" */}
      {/*     } */}
      {/*     value2={ */}
      {/*       resultsSecondData[semester]?.CGPA */}
      {/*         ? `${resultsSecondData[semester].CGPA} | ${resultsSecondData[semester].credits}` */}
      {/*         : "-" */}
      {/*     } */}
      {/*   /> */}
      {/* ))} */}
      {/*   </tbody> */}
      {/* </table> */}
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
            value1={results[0]["results"]["CGPA"]}
            value2={results[1]["results"]["CGPA"]}
          />
          <AttributeRow
            label="Percentage"
            value1={` ${((results[0]["results"]["CGPA"] - 0.5) * 10).toString()} %`}
            value2={` ${((results[1]["results"]["CGPA"] - 0.5) * 10).toString()} %`}
          />
          <AttributeRow
            label="Credits Obtained"
            value1={results[0]["results"]["credits"]}
            value2={results[1]["results"]["credits"]}
          />
          <AttributeRow
            label="Backlogs"
            value1={results[0]["results"]["backlogs"]}
            value2={results[1]["results"]["backlogs"]}
          />
        </tbody>
      </table>
    </div>
  );
}

export default ResultContrastPage;
