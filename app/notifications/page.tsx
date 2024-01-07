"use client";

import { fetchNotifications } from "@/components/api/fetchNotifications";
import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";
const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  useEffect(() => {
    fetchNotifications();
    setLoading(false);
  }, []);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };
  interface Result {
    Result_title: string;
    Date: string; // Adjust the type accordingly
    // Add other properties as needed
    Link: string;
  }
  const filteredResults = (results as Result[]).filter((result) => {
    const title = result.Result_title.toLowerCase();
    const yearMatch = selectedYear === "" || result.Date.includes(selectedYear);
    return title.includes(searchQuery.toLowerCase()) && yearMatch;
  });
  return loading ? (
    <Loading />
  ) : (
    <div className="m-2 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-5 text-xs lg:text-2xl">
        NOTIFICATIONS
      </div>
      <form className="md:mx-[12.5%] ">
        <div className="inline-block w-[100%]">
          <input
            id="searchKey"
            className="w-[100%]  h-[35px] text-[16px] outline-none pr-[108px] pl-[31px] border-[1px] border-solid border-t-zinc-200"
            placeholder="I year I semester"
            type="text"
          />
        </div>
        <div className="inline float-right ml-[-96px] z-5 absolute">
          <select className="h-[35px] w-[96px] text-[14px] p-1 outline-none border-[1px] border-solid border-t-zinc-200">
            <option value=""> Exam Year</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
