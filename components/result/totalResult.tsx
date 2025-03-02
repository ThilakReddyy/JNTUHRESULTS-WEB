import React from "react";

const TotalResult = ({ CGPA, backlogs }: { CGPA: any; backlogs: any }) => {
  return (
    <table className="dark:border-white rounded mt-2">
      <tbody>
        <tr>
          <th className="dark:border-white  dark:bg-[#0b3954] w-[25%] bg-gray-200">
            Backlogs
          </th>
          <th className="dark:border-white w-[25%]">{backlogs}</th>
          <th className="dark:border-white  dark:bg-[#0b3954] w-[25%]  bg-gray-200">
            CGPA
          </th>
          <th className="dark:border-white w-[25%]">
            {backlogs > 0 ? "" : CGPA}
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalResult;
