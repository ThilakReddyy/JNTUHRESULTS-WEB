"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import QuickNavigation from "@/components/navbar/quicknavigation";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import AcademicResult from "@/components/result/academicresult";

const BacklogReportResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const htno = searchParams.get("htno");
  const backlogreport = getFromLocalStorage(htno + "-Backlogreport");

  if (backlogreport === null) {
    router.push("/backlogreport");
  }
  console.log(backlogreport.results);

  return backlogreport === null ? (
    <>
      <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    </>
  ) : (
    <>
      <div className="m-2 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
        <div className="text-center font-bold my-5 text-xs lg:text-2xl">
          BACKLOG REPORT
        </div>
        {/* Render Details */}
        <ResultDetails details={backlogreport.details} />
        {backlogreport.results.totalBacklogs != 0 ? (
          <>
            <table className="dark:border-white my-2">
              <tbody>
                <tr>
                  <th className="dark:border-white w-[50%] bg-gray-200">
                    Total Backlogs
                  </th>
                  <th className="dark:border-white">
                    {backlogreport.results.totalBacklogs}
                  </th>
                </tr>
              </tbody>
            </table>
            <AcademicResult result={backlogreport.results} academic={false} />
          </>
        ) : (
          <table className="dark:border-white my-2">
            <tbody>
              <tr>
                <th className="dark:border-white ">No Backlogs</th>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <QuickNavigation htno={htno} />
    </>
  );
};

export default BacklogReportResult;
