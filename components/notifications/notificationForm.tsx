import React from "react";
import SearchBar from "../notifications/searchBar";
import { examYearDetails } from "@/constants/examyear";
import { degrees } from "@/constants/degree";

const selectClass =
  "h-10 rounded-xl text-sm px-3 outline-none border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200 focus:border-[#0b3954] dark:focus:border-sky-500 transition-colors";

const NotificationForm = ({
  handleChangeParams,
}: {
  handleChangeParams: (param: string, event: any) => void;
}) => {
  const regulations = ["R25", "R22", "R19", "R18", "R17", "R16", "R15", "R13", "R09", "R07", "R05"];

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Search bar row */}
      <SearchBar
        handleSearch={(event) => handleChangeParams("title", event)}
      />

      {/* Filter chips row */}
      <div className="flex flex-wrap gap-2">
        {/* Exam Year */}
        <select
          className={selectClass}
          defaultValue=""
          onChange={(e) => handleChangeParams("year", e)}
        >
          <option value="" disabled>Exam Year</option>
          {Object.keys(examYearDetails)
            .reverse()
            .map((key) => (
              <option value={key} key={key}>
                {examYearDetails[key]}
              </option>
            ))}
        </select>

        {/* Degree */}
        <select
          className={selectClass}
          defaultValue=""
          onChange={(e) => handleChangeParams("degree", e)}
        >
          <option value="" disabled>Degree</option>
          {Object.keys(degrees).map((degree) => (
            <option value={degrees[degree]} key={degree}>
              {degree}
            </option>
          ))}
        </select>

        {/* Regulation */}
        <select
          className={selectClass}
          defaultValue=""
          onChange={(e) => handleChangeParams("regulation", e)}
        >
          <option value="" disabled>Regulation</option>
          {regulations.map((r, i) => (
            <option value={r} key={i}>{r}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NotificationForm;
