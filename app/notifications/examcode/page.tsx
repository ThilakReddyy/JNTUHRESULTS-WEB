"use client";
import NotificationExamCode from "@/components/notifications/notificationExamCode";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Examcode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const link = searchParams.get("link") ?? "";
  const date = searchParams.get("date") ?? "";
  const formatted_date = searchParams.get("formatted_date") ?? ""; // Fixed typo
  const title = searchParams.get("title") ?? "";

  const [validParams, setValidParams] = useState(false);

  useEffect(() => {
    if (!link || !date || !formatted_date || !title || link == "") {
      router.push("/notifications");
    } else {
      setValidParams(true);
    }
  }, [link, date, formatted_date, title, router]);

  if (!validParams) return null; // Prevent rendering before validation
  return (
    <NotificationExamCode
      link={link.split("?")[1]}
      date={date}
      formatted_date={formatted_date}
      title={title}
    />
  );
};

export default Examcode;
