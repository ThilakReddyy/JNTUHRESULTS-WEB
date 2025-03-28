"use client";
import { fetchNotifications } from "@/components/api/fetchResults";
import NotificationForm from "@/components/notifications/notificationForm";
import NotificationResults from "@/components/notifications/notificationResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState, useCallback } from "react";

const Notification = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<Params>({
    title: "",
    year: "",
    degree: "",
    regulation: "",
    page: 1,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const notifications: Result[] = await fetchNotifications(params);
      if (params.page == 1) {
        setResults(notifications);
      } else {
        setResults((prev) => [...prev, ...notifications]); // Prevents stale state issues
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    setLoading(false);
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const incrementPage = () => {
    if (!loading) {
      setParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handleChangeParams = (
    param: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setParams((prev) => ({
      ...prev,
      [param]: event.target.value,
      page: 1, // Reset page when filters change
    }));
    console.log(params);
  };

  return (
    <Tabs defaultValue="resultnotifications" className="m-2">
      <TabsList className="w-full">
        <TabsTrigger value="resultnotifications" className="w-full my-5">
          Result Updates
        </TabsTrigger>
        <TabsTrigger value="examnotifications" className="w-full">
          General Updates
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resultnotifications">
        <div className="m-2 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
          <NotificationForm handleChangeParams={handleChangeParams} />
          <NotificationResults
            results={results}
            incrementPage={incrementPage}
          />
        </div>
      </TabsContent>
      <TabsContent value="examnotifications">
        <div className="text-center flex justify-center items-center h-[500px] font-bold my-5 text-xs lg:text-2xl">
          Coming Soon!!
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Notification;
