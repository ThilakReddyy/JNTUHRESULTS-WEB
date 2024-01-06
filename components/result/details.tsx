import React from "react";

interface ResultDetailsProps {
  Details: Record<string, any>;
}

const ResultDetails = ({ Details }: ResultDetailsProps) => {
  return (
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
  );
};

export default ResultDetails;
