"use client";
import { useEffect, useState } from "react";
import { syllabusDetails } from "@/constants/syllabusdetails";
import {
  AcademicYearDetails,
  CalendarEntry,
  DegreeDetails,
  academicCalendars,
} from "@/constants/academiccalendars";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/footer/footer";
import GoogleDocViewer from "@/components/googledocviewer/GoogleDocViewer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Calendars = () => {
  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<DegreeDetails>({});
  const [years, setYears] = useState<AcademicYearDetails>({});
  const [calendars, setCalendars] = useState<CalendarEntry>({});

  const [academicYear, setAcademicYear] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [calendar, setCalendar] = useState<string>("");

  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setAcademicYears(Object.keys(academicCalendars));
  }, []);

  useEffect(() => {
    if (academicYear) {
      setDegrees(academicCalendars[academicYear]);
      setDegree("");
      setYears({});
      setCalendars({});
      setYear("");
      setCalendar("");
      setLink("");
    }
  }, [academicYear]);

  useEffect(() => {
    if (degree && degrees != null) {
      setYears(degrees[degree]);
      setCalendars({});
      setYear("");
      setCalendar("");
      setLink("");
    }
  }, [degree, degrees]);

  useEffect(() => {
    if (year) {
      const academicYearDetails = years[year];
      setCalendars(academicYearDetails);
      setCalendar("");
      setLink("");
    }
  }, [year, years]);

  useEffect(() => {
    if (calendar) {
      const link = calendars[calendar];
      setLink(link);
    }
  }, [calendar, calendars]);

  return (
    <>
      <div className="w-[75%] mt-[6%] mx-[12.5%]">
        <div className="min-h-[350px] rounded-md border-black dark:border-white border-2 shadow-2xl">
          <div className="pt-[30px] pb-[50px]">
            <div className="md:text-2xl font-semibold flex justify-center">
              ACADEMIC CALENDARS
            </div>
            <br />
            <div className="text-xs w-full px-[15%] md:px-[30%]">
              <select
                name="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full text-[8px] md:text-xs font-light border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center"
              >
                <option value="" disabled>
                  Select the Academic Year
                </option>
                {academicYears.map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs w-full px-[15%] md:px-[30%]">
              <select
                name="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full text-[8px] md:text-xs font-light border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center"
              >
                <option value="" disabled>
                  Select the Degree
                </option>
                {Object.keys(degrees).map((degree, index) => (
                  <option value={degree} key={index}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs w-full px-[15%] md:px-[30%]">
              <select
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full text-[8px] md:text-xs font-light border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center"
              >
                <option value="" disabled>
                  Select the Year
                </option>
                {Object.keys(years).map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs w-full px-[15%] md:px-[30%]">
              <select
                name="calendar"
                value={calendar}
                onChange={(e) => setCalendar(e.target.value)}
                className="w-full text-[8px] md:text-xs font-light border border-black dark:border-white border-double mt-[5px] rounded-sm h-[35px] text-center"
              >
                <option value="" disabled>
                  Select the Calendar
                </option>
                {Object.keys(calendars).map((calendar, index) => (
                  <option value={calendar} key={index}>
                    {calendar}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex justify-center mt-8">
              <Dialog>
                <DialogTrigger
                  disabled={!link}
                  className="block lg:hidden cursor-pointer text-sm md:text-lg px-3 py-1 rounded bg-black dark:bg-gray-300 dark:text-black text-white w-[80px] md:w-[130px]"
                  onClick={() => {
                    if (!link) {
                      toast.error("Select all the required fields");
                    }
                  }}
                >
                  Open
                </DialogTrigger>
                <DialogContent className="w-[95%] my-2 bg-transparent pt-8 pb-1 px-1">
                  {link && <GoogleDocViewer url={link} splNote={"calendar"} />}
                </DialogContent>
              </Dialog>
              <button
                className="text-sm md:text-lg px-3 py-1 rounded bg-black dark:bg-gray-300 dark:text-black text-white w-[100px] md:w-[130px] cursor-pointer hidden lg:block"
                onClick={() => {
                  if (!link) {
                    toast.error("Select all the required fields");
                  }
                }}
              >
                {link ? (
                  <Link href={link} target="_blank">
                    Download
                  </Link>
                ) : (
                  "Download"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calendars;
