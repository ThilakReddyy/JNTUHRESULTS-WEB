"use client";

import { useEffect, useState } from "react";

import { fetchNotifications } from "@/components/api/fetchResults";

/**
 * The homepage strip and the mobile popup both want the first page of
 * notifications. Sharing one in-flight promise keeps that to a single backend
 * request per page load instead of one per consumer.
 */
let latestNotifications: Promise<Result[]> | null = null;

const loadLatestNotifications = () => {
  if (!latestNotifications) {
    latestNotifications = fetchNotifications({
      title: "",
      year: "",
      degree: "",
      regulation: "",
      page: 1,
    })
      .then((notifications) =>
        Array.isArray(notifications) ? (notifications as Result[]) : [],
      )
      .catch((error) => {
        // Let a later mount retry rather than caching the failure.
        latestNotifications = null;
        console.error("Error fetching notifications:", error);
        return [] as Result[];
      });
  }

  return latestNotifications;
};

export const useLatestNotifications = () => {
  const [notifications, setNotifications] = useState<Result[]>([]);

  useEffect(() => {
    let cancelled = false;

    void loadLatestNotifications().then((results) => {
      if (!cancelled) setNotifications(results);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return notifications;
};
