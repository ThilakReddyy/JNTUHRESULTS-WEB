"use client";
import { fetchNotifications } from "@/components/api/fetchResults";
import NotificationForm from "@/components/notifications/notificationForm";
import NotificationResults from "@/components/notifications/notificationResults";
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
      if (notifications) {
        if (params.page == 1) {
          setResults(notifications);
        } else {
          setResults((prev) => [...prev, ...notifications]);
        }
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
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleChangeParams = (param: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({ ...prev, [param]: event.target.value, page: 1 }));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* Page header */}
      <div className="text-center mb-6">
        <h1 className="font-extrabold text-lg lg:text-2xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          Notifications
        </h1>
        <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
          Result Updates
        </p>
      </div>

      <NotificationForm handleChangeParams={handleChangeParams} />

      {loading && results.length === 0 ? (
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.03] h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <NotificationResults results={results} incrementPage={incrementPage} />
          {loading && (
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4 animate-pulse">
              Loading more…
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Notification;
