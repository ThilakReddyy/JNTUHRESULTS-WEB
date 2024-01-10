"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getLocalStoragedata } from "@/components/api/fetchAcademicResult";
import { calculateResult } from "@/components/customfunctions/calculateresult";
import { grades, credits } from "@/constants/resultconstants";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import ResultDetails from "@/components/result/details";

const AcademicResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const details = getLocalStoragedata(String(htno));

  const { Details: resultdetails, Results: resultresults } =
    details?.value || {};

  const [renderKey, setRenderKey] = useState(0);
  const [Details] = useState(resultdetails);
  const [Results, setResults] = useState(resultresults);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setResults(calculateResult(Results));
    setRenderKey((prevkey) => prevkey + 1);
  }, [Results]);

  useEffect(() => {
    if (details === null) {
      router.push("/academicresult");
    }
  }, [details, router]);

  const editResults = (
    value: string,
    subject_key: string,
    newValue: string,
    keychange: string,
  ) => {
    setResults((prevResults: typeof Results) => ({
      ...prevResults,
      [value]: {
        ...prevResults[value],
        [subject_key]: {
          ...prevResults[value][subject_key],
          [keychange]: newValue,
        },
      },
    }));
  };

  return details === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <div
      key={renderKey}
      className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
    >
      <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
        <div></div>
        <div className="justify-center">ACADEMIC RESULT</div>
        <div className="justify-end flex ">
          <button
            className="text-xs items-center p-1 border rounded md:hidden text-white  bg-blue-600 "
            onClick={() => setEdit(!edit)}
          >
            {edit ? <IoSaveOutline size={10} /> : <CiEdit size={"10"} />}
          </button>
          <button
            className="text-xs items-center p-2 border rounded hidden md:block text-white  bg-blue-600 "
            onClick={() => setEdit(!edit)}
          >
            {edit ? <IoSaveOutline /> : <CiEdit />}
          </button>
        </div>
      </div>

      {/* Render Details */}
      <ResultDetails Details={Details} />

      {Object.keys(Results).map((value: string, index: number) => {
        return (
          <div key={index}>
            {value != "Total" ? (
              <>
                <table className="dark:border-white w-[100%]">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                        {value} Results
                      </th>
                    </tr>
                  </tbody>
                </table>
                <table className="dark:border-white">
                  <tbody>
                    <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954]">
                      <th className="dark:border-white">SUBJECT_CODE</th>
                      <th className="dark:border-white">SUBJECT_NAME</th>
                      <th className="dark:border-white">INTERNAL</th>
                      <th className="dark:border-white">EXTERNAL</th>
                      <th className="dark:border-white">TOTAL</th>
                      <th className="dark:border-white">GRADE</th>
                      <th className="dark:border-white">CREDITS</th>
                    </tr>
                    {Object.values(Results[value]).map(
                      (subjectvalue: any, index: number) => {
                        if (typeof subjectvalue === "object") {
                          return (
                            <tr key={index}>
                              <th className="dark:border-white">
                                {subjectvalue["subject_code"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_name"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_internal"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_external"]}
                              </th>
                              <th className="dark:border-white">
                                {subjectvalue["subject_total"]}
                              </th>
                              {edit ? (
                                <th className="dark:border-white">
                                  <select
                                    className="selectth"
                                    value={subjectvalue["subject_grade"]}
                                    onChange={(e) => {
                                      const subject_key =
                                        subjectvalue["subject_code"];
                                      editResults(
                                        value,
                                        subject_key,
                                        e.target.value,
                                        "subject_grade",
                                      );
                                    }}
                                  >
                                    {grades.map((grade) => (
                                      <option key={grade} value={grade}>
                                        {grade}
                                      </option>
                                    ))}
                                  </select>
                                </th>
                              ) : (
                                <th className="dark:border-white">
                                  {subjectvalue["subject_grade"]}
                                </th>
                              )}
                              {edit ? (
                                <th className="dark:border-white">
                                  <select
                                    className="selectth"
                                    value={subjectvalue["subject_credits"]}
                                    onChange={(e) => {
                                      const subject_key =
                                        subjectvalue["subject_code"];
                                      editResults(
                                        value,
                                        subject_key,
                                        e.target.value,
                                        "subject_credits",
                                      );
                                    }}
                                  >
                                    {credits.map((grade) => (
                                      <option key={grade} value={grade}>
                                        {grade}
                                      </option>
                                    ))}
                                  </select>
                                </th>
                              ) : (
                                <th className="dark:border-white">
                                  {subjectvalue["subject_credits"]}
                                </th>
                              )}
                            </tr>
                          );
                        }
                      },
                    )}
                  </tbody>
                </table>
                <table className="dark:border-white">
                  <tbody>
                    <tr>
                      <th className="dark:border-white w-[75%]">CGPA</th>
                      <th className="dark:border-white">
                        {Results[value]["CGPA"]}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <br />
              </>
            ) : (
              <table className="dark:border-white" key={index}>
                <tbody>
                  <tr>
                    <th className="dark:border-white w-[75%]">TOTAL CGPA</th>
                    <th className="dark:border-white">{Results[value]}</th>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AcademicResultResult;
