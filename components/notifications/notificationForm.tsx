import React from "react";
import SearchBar from "../notifications/searchBar";
import { examYearDetails } from "@/constants/examyear";
import { degrees } from "@/constants/degree";

const NotificationForm = ({
  handleChangeParams,
}: {
  handleChangeParams: (param: string, event: any) => void;
}) => {
  const regulations = [
    "R22",
    "R19",
    "R18",
    "R17",
    "R16",
    "R15",
    "R13",
    "R09",
    "R07",
    "R05",
  ];
  return (
    <form className="md:mx-[12.5%] ">
      <div className="border-2 border-solid border-black dark:border-white">
        <SearchBar
          handleSearch={(event) => {
            handleChangeParams("title", event);
          }}
        />
        <div className="inline float-right ml-[-96px] z-5 absolute">
          <select
            className="h-[35px] w-[96px] text-[14px] p-1 outline-none border-[1px] border-solid border-t-zinc-200"
            defaultValue={""}
            onChange={(event) => {
              handleChangeParams("year", event);
            }}
          >
            <option value="" disabled>
              Exam Year
            </option>
            {Object.keys(examYearDetails)
              .reverse()
              .map((examYearKey) => {
                return (
                  <option value={examYearKey} key={examYearKey}>
                    {examYearDetails[examYearKey]}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="m-5 flex justify-center">
        <div className="flex">
          <select
            className="m-2 h-[35px] rounded w-[120px] text-[14px] p-1 outline-none border-[1px] border-solid border-zinc-200"
            defaultValue={""}
            onChange={(event) => {
              handleChangeParams("degree", event);
            }}
          >
            <option value="" disabled>
              Select Degree
            </option>

            {Object.keys(degrees).map((degree) => (
              <option value={degrees[degree]} key={degree}>
                {degree}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-[35px] rounded w-[140px] text-[14px] p-1 outline-none border-[1px] border-solid border-zinc-200"
            defaultValue={""}
            onChange={(event) => {
              handleChangeParams("regulation", event);
            }}
          >
            <option value="" disabled>
              Select Regulation
            </option>
            {regulations.map((regulation: string, index: number) => {
              return (
                <option value={regulation} key={index}>
                  {regulation}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </form>
  );
};

export default NotificationForm;
