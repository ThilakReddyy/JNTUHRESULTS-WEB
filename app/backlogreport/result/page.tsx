"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getLocalStoragedata } from "@/components/api/fetchAcademicResult";

const BacklogReportResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const htno = searchParams.get("htno");
  const details = getLocalStoragedata(String(htno), true);
  console.log(details);
  let Details = {};
  let Results = {};
  useEffect(() => {
    if (details === null) {
      router.push("/backlogreport");
    }
  }, [details, router]);
  if (details !== null) {
    const resultDetails = details.value;
    Details = resultDetails["Details"];
    Results = resultDetails["Results"];
  }
  return details === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <div className="m-2 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-5 text-xs lg:text-2xl">
        BACKLOG REPORT
      </div>
      <table className="w-[100%] my-2  border-black dark:border-white   ">
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
      {Object.keys(Results).map((value: string, index: number) => {
        return (
          <div key={index}>
            {value != "Total" ? (
              <>
                <table className="dark:border-white w-[100%]">
                  <tbody>
                    <tr>
                      <th className="dark:border-white">{value} Results</th>
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
                    {Object.values(Results[value as keyof typeof Results]).map(
                      (value: any, index: number) => {
                        if (typeof value === "object") {
                          return (
                            <tr key={index}>
                              <th className="dark:border-white">
                                {value["subject_code"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_name"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_internal"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_external"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_total"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_grade"]}
                              </th>
                              <th className="dark:border-white">
                                {value["subject_credits"]}
                              </th>
                            </tr>
                          );
                        }
                      },
                    )}
                  </tbody>
                </table>
                <br />
              </>
            ) : (
              <table className="dark:border-white" key={index}>
                <tbody>
                  <tr>
                    <th className="dark:border-white w-[75%]">TOTAL CGPA</th>
                    <th className="dark:border-white">
                      {Results[value as keyof typeof Results]}
                    </th>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      })}
      {Object.keys(Results).length === 0 && (
        <table className="dark:border-white">
          <tbody>
            <tr>
              <th className="dark:border-white">NO BACKLOGS</th>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BacklogReportResult;
