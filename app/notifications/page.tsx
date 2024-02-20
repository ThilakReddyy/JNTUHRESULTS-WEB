"use client";

import { fetchNotifications } from "@/components/api/fetchNotifications";
import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";

import NotificationForm from "@/components/notifications/notificationForm";
import NotificationResults from "@/components/notifications/notificationResults";

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
      <NotificationForm
        handleSearch={handleSearch}
        handleYearChange={handleYearChange}
        handleDegreeChange={handleDegreeChange}
        handleRegulationChange={handleRegulationChange}
      />
      <NotificationResults filteredResults={filteredResults} />
    </div>
  );
};

export default Notifications;
