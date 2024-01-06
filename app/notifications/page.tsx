"use client";

import { fetchNotifications } from "@/components/api/fetchNotifications";
import { useEffect } from "react";

const Notifications = () => {
  useEffect(() => {
    fetchNotifications();
  });
  return <div>Notificdations</div>;
};

export default Notifications;
