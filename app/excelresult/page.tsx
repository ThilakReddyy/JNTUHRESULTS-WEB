"use client";
import { Input } from "@/components/ui/input";
import React from "react";

import readXlsxFile from "read-excel-file";
import { useState } from "react";
const ExcelResult = () => {
  const [results, setResults] = useState({});

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    readXlsxFile(file).then((fileRows) => {
      const students_results = fileRows.slice(3);
      const resultsDictionary = students_results.reduce(
        (acc: any, student: any) => {
          const htno: string = student[0];
          const result = {
            subject_code: student[1],
            subject_name: student[2],
            internal_marks: student[3],
            external_marks: student[4],
            total_marks: student[5],
            grade: student[6],
            grade_points: student[7],
            credits: student[8],
          };

          if (acc[htno]) {
            acc[htno].results.push(result); // Append the result to existing results array
          } else {
            acc[htno] = { htno, results: [result] }; // Create a new entry in the dictionary
          }
          return acc;
        },
        {},
      );
      let sortedObj1: { [key: string]: number } = {};
      Object.keys(resultsDictionary)
        .sort()
        .forEach((key: string) => {
          sortedObj1[key] = resultsDictionary[key];
        });
      setResults(resultsDictionary);
    });
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl my-4">
        Enter Your Excel Sheet provided by jntuh and get the result in a
        structured manner
      </h1>
      <div className="w-full flex justify-center mb-8">
        <div
          className={`md:w-[1000px]  text-center items-center gap-1.5 py-12 border border-white  rounded flex justify-center ${Object.keys(results).length == 0 ? "" : "hidden"}`}
        >
          <Input
            type="file"
            className="text-center h-[100px] items-center "
            onChange={handleFileChange}
            placeholder="Please Select the Excel file here"
            id="files"
          />
        </div>
      </div>
    </>
  );
};

export default ExcelResult;
