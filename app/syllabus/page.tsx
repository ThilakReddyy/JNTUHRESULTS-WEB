"use client";
import React, { useEffect, useState } from "react";
import { syllabusDetails } from "@/constants/syllabusdetails";
import Link from "next/link";
const Syllabus = () => {
  const [degrees, setDegrees] = useState<string[]>([]);
  const [degree, setDegree] = useState<string>("");
  const [regulations, setRegulations] = useState<string[]>([]);
  const [regulation, setRegulation] = useState("");
  const [semesteryears, setSemesterYears] = useState<string[]>([]);
  const [semesteryear, setSemesterYear] = useState("");
  const [syllabus, setSyllabus] = useState<{ title: string; link: string }[]>(
    [],
  );
  const [syllabusPdf, setSyllabusPdf] = useState(null);
  const [link, setLink] = useState("");
  useEffect(() => {
    const keys: string[] = Object.keys(syllabusDetails);
    setDegrees(keys);
  }, [setDegrees]);

  const handleDegreechange = (event: any) => {
    const value = event.target?.value;
    setDegree(value);
    const selectedDegree =
      syllabusDetails[value as keyof typeof syllabusDetails];
    setLink("");
    const isArray = Array.isArray(selectedDegree);
    if (isArray) {
      setSyllabus(selectedDegree);
      setRegulations([]);
      setSemesterYears([]);
    } else {
      setSyllabus([]);
      setSemesterYears([]);
      setRegulation("");
      const regulationkeys = Object.keys(
        syllabusDetails[value as keyof typeof syllabusDetails],
      );
      setRegulations(regulationkeys);
    }
  };

  const handleRegulationChange = (event: any) => {
    const value = event.target?.value;

    console.log(value);
    setRegulation(value);
    setLink("");
    const selectedDegree =
      syllabusDetails[degree as keyof typeof syllabusDetails];
    const selectedregulation =
      selectedDegree[value as keyof typeof selectedDegree];
    const isArray = Array.isArray(selectedregulation);
    if (isArray) {
      setSyllabus(selectedregulation);
      setSemesterYears([]);
    } else {
      setSyllabus([]);
      const yearkeys = Object.keys(selectedregulation);
      setSemesterYears(yearkeys);
    }
  };

  const handleSemesterYearChange = (event: any) => {
    const value = event.target?.value;
    console.log(value);
    setLink("");
    setSemesterYear(value);
    const selectedDegree =
      syllabusDetails[degree as keyof typeof syllabusDetails];
    const selectedregulation =
      selectedDegree[regulation as keyof typeof selectedDegree];
    const selectedSemesterYear =
      selectedregulation[value as keyof typeof selectedregulation];
    const isArray = Array.isArray(selectedSemesterYear);
    if (isArray) {
      setSyllabus(selectedSemesterYear);
    }
  };
  const handleSemesterPdfChange = (event: any) => {
    const value = event.target?.value;
    const val = value.split("SYLLABUS");
    const link = val[0] + "SYLLABUS" + encodeURI(val[1]);
    setLink(link);
  };
  return (
    <>
      <div className="w-[75%]  mt-[6%]  mx-[12.5%]   ">
        <div className="rounded-md border-black dark:border-white border-2  shadow-2xl">
          <div className=" pt-[30px] pb-[50px]">
            <div className=" md:text-2xl  font-semibold  ">
              <div className=" md:text-2xl   font-semibold   flex justify-center ">
                SYLLABUS
              </div>
              <br />
              <div className="text-xs w-full px-[15%] md:px-[30%]">
                <select
                  name="degree"
                  defaultValue={""}
                  onChange={handleDegreechange}
                  className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
                >
                  {" "}
                  <option value="" disabled>
                    Select the Degree...
                  </option>
                  {degrees.map((degree: string, index: number) => (
                    <option
                      value={degree}
                      key={index}
                      style={{ width: "10px" }} // Adjust the width as needed
                    >
                      {degree}
                    </option>
                  ))}
                </select>
              </div>
              {regulations.length !== 0 && (
                <div className="text-xs w-full px-[15%] md:px-[30%]">
                  <select
                    name="regulation"
                    defaultValue={regulation}
                    onChange={handleRegulationChange}
                    className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
                  >
                    <option value="" disabled>
                      Select the Regulation
                    </option>
                    {regulations.map((regulation: string, index: number) => (
                      <option
                        value={regulation}
                        key={index}
                        style={{ width: "10px" }} // Adjust the width as needed
                      >
                        {regulation}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {semesteryears.length !== 0 && (
                <div className="text-xs w-full px-[15%] md:px-[30%]">
                  <select
                    name="semesteryear"
                    defaultValue={semesteryear}
                    onChange={handleSemesterYearChange}
                    className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
                  >
                    <option value="" disabled>
                      Select the Semester Year
                    </option>
                    {semesteryears.map(
                      (semesteryear: string, index: number) => (
                        <option
                          value={semesteryear}
                          key={index}
                          style={{ width: "10px" }} // Adjust the width as needed
                        >
                          {semesteryear}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}
              {syllabus.length !== 0 && (
                <div className="text-xs w-full px-[15%] md:px-[30%]">
                  <select
                    name="pdf"
                    defaultValue={""}
                    onChange={handleSemesterPdfChange}
                    className="w-full text-[8px] md:text-xs font-light  border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center "
                  >
                    <option value="" disabled>
                      Select the syllabus
                    </option>
                    {syllabus.map((degree: any, index: number) => (
                      <option
                        value={degree?.link}
                        key={index}
                        style={{ width: "10px" }} // Adjust the width as needed
                      >
                        {degree?.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div
                className={`
                w-full flex justify-center mt-8 ${link === "" ? "hidden" : ""}`}
              >
                <button
                  type="submit"
                  className="
                  text-sm md:text-lg
                  px-3 py-1
                  rounded
                  bg-black dark:bg-gray-300
                  dark:text-black text-white
                  w-[100px]
                  md:w-[130px]
                  cursor-pointer
                  "
                  disabled
                  onClick={() => {}}
                >
                  <Link href={link} target="_blank">
                    Download
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Syllabus;
