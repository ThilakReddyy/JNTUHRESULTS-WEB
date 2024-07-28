"use client";

import { fetchNotifications } from "@/components/api/fetchNotifications";
import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";

import NotificationForm from "@/components/notifications/notificationForm";
import NotificationResults from "@/components/notifications/notificationResults";
import { NotificationList } from "@/constants/notifications";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[]>(NotificationList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedRegulation, setSelectedRegulation] = useState("");

  interface Result {
    Result_title: string;
    Date: string;
    Link: string;
    formatted_date: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetchData from local ");
        setLoading(false);
        // const storageData = localStorage.getItem("notifications");
        //
        // if (storageData !== null) {
        //   setResults(JSON.parse(storageData));
        //   setLoading(false);
        // }
        //
        // // return;
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
      <NotificationResults
        results={results}
        searchQuery={searchQuery}
        selectedDegree={selectedDegree}
        selectedRegulation={selectedRegulation}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Notifications;
