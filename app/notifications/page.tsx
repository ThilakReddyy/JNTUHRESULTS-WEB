"use client";

import { fetchNotifications } from "@/components/api/fetchNotifications";
import Loading from "@/components/loading/loading";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { examYearDetails } from "@/constants/examyear";
import { AiOutlineShareAlt } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";
import SearchBar from "@/components/notifications/searchBar";
import Link from "next/link";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedRegulation, setSelectedRegulation] = useState("");
  const [loadedCount, setLoadedCount] = useState(10);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  interface Result {
    Result_title: string;
    Date: string;
    Link: string;
    formatted_date: string;
  }

  function shareUrl(link: any, title: string) {
    if (!navigator.share) return;

    const sharedText = `*Check out the Results!* \n\n ${title}\n\n\n`;

    navigator
      .share({
        title: "Check out this website!",
        text: sharedText,
        url: link,
      })
      .then(() => console.log("Successfully shared!"))
      .catch((error) => console.log("Error sharing:", error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageData = localStorage.getItem("notifications");

        if (storageData !== null) {
          setResults(JSON.parse(storageData));
          setLoading(false);
        }
        const notifications = await fetchNotifications();

        if (notifications !== null) {
          setResults(notifications);
          localStorage.setItem("notifications", JSON.stringify(notifications));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const isScrolledToBottom = scrollTop + clientHeight + 300 >= scrollHeight;
      if (isScrolledToBottom) {
        setLoadedCount((prevCount) => prevCount + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
    console.log(event.target.value);
  };
  const handleDegreeChange = (event: any) => {
    setSelectedDegree(event.target.value);
    console.log(event.target.value);
  };
  const handleRegulationChange = (event: any) => {
    setSelectedRegulation(event.target.value);
    console.log(event.target.value);
  };
  const degrees = [
    "B.Tech",
    "B.Pharmacy",
    "M.Tech",
    "M.Pharmacy",
    "M.B.A",
    "M.C.A",
  ];
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
  useEffect(() => {
    var tempres = (results as Result[]).filter((result) => {
      const title = result.Result_title.toLowerCase();
      const yearMatch =
        selectedYear === "" || result.Date.includes(selectedYear);
      return (
        title.includes(searchQuery.toLowerCase()) &&
        yearMatch &&
        title.includes(selectedDegree.toLowerCase()) &&
        title.includes(selectedRegulation.toLowerCase())
      );
    });
    setFilteredResults(tempres.slice(0, loadedCount));
  }, [
    results,
    searchQuery,
    selectedYear,
    setFilteredResults,
    loadedCount,
    selectedDegree,
    selectedRegulation,
  ]);

  return loading ? (
    <Loading />
  ) : (
    <div className="m-2 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-5 text-xs lg:text-2xl">
        NOTIFICATIONS
      </div>
      <form className="md:mx-[12.5%] ">
        <div className="border-2 border-solid border-black dark:border-white">
          <SearchBar handleSearch={handleSearch} />
          <div className="inline float-right ml-[-96px] z-5 absolute">
            <select
              className="h-[35px] w-[96px] text-[14px] p-1 outline-none border-[1px] border-solid border-t-zinc-200"
              defaultValue={""}
              onChange={handleYearChange}
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
              onChange={handleDegreeChange}
            >
              <option value="" disabled>
                Select Degree
              </option>
              {degrees.map((degree: string, index: number) => {
                return (
                  <option value={degree} key={index}>
                    {degree}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-[35px] rounded w-[140px] text-[14px] p-1 outline-none border-[1px] border-solid border-zinc-200"
              defaultValue={""}
              onChange={handleRegulationChange}
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
      <div className="hidden md:block">
        <div className="home-links flex flex-wrap items-center max-w-4xl mt-6 sm:w-full text-center  justify-around mx-auto">
          {filteredResults.length === 0 &&
            "No Notifications for this search query"}
          {filteredResults.map((result, index) => (
            <Link
              key={index}
              href={
                "notifications/" +
                result.Link.split("?")[1] +
                "?" +
                "title=" +
                result.Result_title +
                "&date=" +
                result.Date +
                "&formatted_date=" +
                result.formatted_date
              }
            >
              <div className="border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300">
                <h3 className="group-hover:text-black text-lg sm:text-xl font-bold">
                  <div className="flex flex-row items-center justify-start dark:text-white">
                    <span className="p-1">{result.Result_title}</span>
                  </div>
                </h3>
                <p className="group-hover:text-black dark:text-slate-100 text-slate-500 mt-4 text-base sm:text-xl">
                  {" "}
                  {result.Date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" md:hidden pt-5">
        {filteredResults.map((result, index) => (
          <div
            key={index}
            className="bg-gray-200  dark:bg-gray-800 text-left p-[20px] mb-[3px] pb-[5px] md:hidden"
          >
            <h3 key={index} className="group-hover:text-black  font-bold ">
              <Link
                href={
                  "notifications/" +
                  result.Link.split("?")[1] +
                  "?" +
                  "title=" +
                  result.Result_title +
                  "&date=" +
                  result.Date +
                  "&formatted_date=" +
                  result.formatted_date
                }
              >
                <div className=" justify-start font-interer  text-base">
                  JNTUH {result.Result_title}
                </div>
              </Link>
              <div className="text-xs text-gray-700 dark:text-gray-200 font-semibold flex  py-2 font-interer">
                <span>{result?.Date} </span>

                <div className="ml-auto flex ">
                  <Link
                    className="px-[5px]"
                    target="_blank"
                    href={`https://api.whatsapp.com/send?text=*Check out the Results!* \n\n ${result.Result_title} \n\n${result.Link}\n`}
                  >
                    <RiWhatsappLine size={17} />
                  </Link>

                  <span
                    className="px-5"
                    onClick={() => shareUrl(result.Link, result.Result_title)}
                  >
                    <AiOutlineShareAlt size={18} />
                  </span>
                </div>
              </div>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
