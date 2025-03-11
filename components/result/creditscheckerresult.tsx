import React from "react";

const CreditsCheckerResult = ({
  results,
  htno,
}: {
  results: StudentCredits;
  htno: string;
}) => {
  const studenttype = htno[4] == "1" ? "Regular" : "Lateral";
  const year = Object.keys(
    results.academicYears[results.academicYears.length - 1].semesterWiseCredits,
  )[0].split("-")[0];
  return (
    <div className="flex flex-col gap-2">
      {results.academicYears.map((result: AcademicYear, index: number) => {
        return (
          <div key={index} className="my-2">
            <table className="dark:border-white">
              <tbody>
                <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954] ">
                  <th className="dark:border-white">
                    {studenttype === "Regular" ? index + 1 : index + 2} Year
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="dark:border-white border border-black border-solid">
              <table className="dark:border-white">
                <tbody>
                  <tr className="w-max bg-gray-200 md:bg-gray-300  dark:border-white dark:bg-[#0b3954]">
                    <th className="dark:border-white w-[50%]">SEMESTER</th>
                    <th className="dark:border-white ">CREDITS</th>
                  </tr>
                  {Object.keys(result.semesterWiseCredits).map(
                    (semester: string, index: number) => {
                      return (
                        <tr className="w-max " key={index}>
                          <th className="dark:border-white">{semester}</th>
                          <th className="dark:border-white">
                            {result.semesterWiseCredits[semester]}
                          </th>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
      <table className="border dark:border-white w-full">
        <tbody>
          <tr>
            <th className="bg-gray-200 md:bg-gray-300 w-[50%] dark:border-white dark:bg-[#0b3954]  p-2  text-center">
              Total Credits
            </th>
            <th className="w-[50%] dark:border-white p-2  text-center">
              {results.totalObtainedCredits}/{results.totalCredits}
            </th>
          </tr>
        </tbody>
      </table>
      <div className="text-center text-sm border-black border my-2  p-[0.5px] dark:border-white">
        <div className="border-black border text-[70%] md:text-[100%] py-1 bg-gray-200 dark:bg-[#0b3954] border-separate border-spacing-4 m-[0.5px] dark:border-white">
          {results.totalRequiredCredits > results.totalObtainedCredits ? (
            <b>
              You require{" "}
              <b className="text-red-500">
                {results.totalRequiredCredits - results.totalObtainedCredits}
              </b>{" "}
              {year === "4" ? (
                <>additional credits to graduate from college</>
              ) : (
                <>{" to advance to the next academic year."} </>
              )}
            </b>
          ) : (
            <b>
              {year === "4" ? (
                <>{"Congratulations you have been graduated 🎓"}</>
              ) : (
                <>
                  {
                    "Congratulations you have promoted to the next academic year 🎊"
                  }{" "}
                </>
              )}
            </b>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditsCheckerResult;
{
  /* <> */
}
{
  /*   {keys.map((subkeys, index) => { */
}
{
  /*     return ( */
}
{
  /*       <div key={index} className="my-2"> */
}
{
  /*         <table className="dark:border-white"> */
}
{
  /*           <tbody> */
}
{
  /*             <tr className="w-max bg-gray-200 md:bg-gray-300 dark:border-white dark:bg-[#0b3954] "> */
}
{
  /*               <th className="dark:border-white"> */
}
{
  /*                 {studenttype === "Regular" ? index + 1 : index + 2} Year */
}
{
  /*               </th> */
}
{
  /*             </tr> */
}
{
  /*           </tbody> */
}
{
  /*         </table> */
}
{
  /*         <div className="dark:border-white border border-black border-solid"> */
}
{
  /*           <table className="dark:border-white"> */
}
{
  /*             <tbody> */
}
{
  /*               <tr className="w-max bg-gray-200 md:bg-gray-300  dark:border-white dark:bg-[#0b3954]"> */
}
{
  /*                 <th className="dark:border-white w-[50%]">SEMESTER</th> */
}
{
  /*                 <th className="dark:border-white ">CREDITS</th> */
}
{
  /*               </tr> */
}
{
  /*               {subkeys.map((key, ind) => { */
}
{
  /*                 return ( */
}
{
  /*                   <tr className="w-max " key={index + ind}> */
}
{
  /*                     <th className="dark:border-white">{key}</th> */
}
{
  /*                     <th className="dark:border-white"> */
}
{
  /*                       {Results[key]["credits"]} */
}
{
  /*                     </th> */
}
{
  /*                   </tr> */
}
{
  /*                 ); */
}
{
  /*               })} */
}
{
  /*             </tbody> */
}
{
  /*           </table> */
}
{
  /*           <table className="dark:border-white mt-1"> */
}
{
  /*             <tbody> */
}
{
  /*               <tr> */
}
{
  /*                 <th className="bg-gray-200 md:gray-300 w-[50%] dark:border-white dark:bg-[#0b3954]"> */
}
{
  /*                   Credits Obtained */
}
{
  /*                 </th> */
}
{
  /*                 <th className="dark:border-white"> */
}
{
  /*                   {credits[index]["credits_received"]}/ */
}
{
  /*                   {credits[index]["total_credits"]} */
}
{
  /*                 </th> */
}
{
  /*               </tr> */
}
{
  /*             </tbody> */
}
{
  /*           </table> */
}
{
  /*         </div> */
}
{
  /*       </div> */
}
{
  /*     ); */
}
{
  /*   })} */
}
{
  /*   <table className="dark:border-white"> */
}
{
  /*     <tbody> */
}
{
  /*       <tr> */
}
{
  /*         <th className="bg-gray-200 md:gray-300 w-[50%] dark:border-white dark:bg-[#0b3954]"> */
}
{
  /*           Total Credits */
}
{
  /*         </th> */
}
{
  /*         <th className="w-[50%] dark:border-white"> */
}
{
  /*           {totalCredits}/{creditregulations[year]["Total"]} */
}
{
  /*         </th> */
}
{
  /*       </tr> */
}
{
  /*     </tbody> */
}
{
  /*   </table> */
}
{
  /*   <div className="text-center text-sm border-black border my-2  p-[0.5px]"> */
}
{
  /*     <div className="border-black border text-[70%] md:text-[100%] py-1 bg-gray-200 dark:bg-[#0b3954] border-separate border-spacing-4 m-[0.5px]"> */
}
{
  /*       {totalCredits < creditregulations[year]["Required"] ? ( */
}
{
  /*         <div className="text-black"> */
}
{
  /*           You require{" "} */
}
{
  /*           <b className="text-red-500"> */
}
{
  /*             {creditregulations[year]["Required"] - totalCredits} */
}
{
  /*           </b>{" "} */
}
{
  /*           additional credits */
}
{
  /*           {year === 4 || (year === 3 && htno?.[4] == "5") */
}
{
  /*             ? " to graduate from college" */
}
{
  /*             : " to advance to the next academic year."} */
}
{
  /*         </div> */
}
{
  /*       ) : ( */
}
{
  /*         <div className="text-green-800"> */
}
{
  /*           <b> */
}
{
  /*             {year === 4 || (year === 3 && htno?.[4] == "5") */
}
{
  /*               ? "Congratulations you have been graduated 🎓" */
}
{
  /*               : "Congratulations you have promoted to the next academic year 🎊"} */
}
{
  /*           </b> */
}
{
  /*         </div> */
}
{
  /*       )} */
}
{
  /*     </div> */
}
{
  /*   </div> */
}
{
  /* </> */
}
