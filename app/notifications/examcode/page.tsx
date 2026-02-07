"use client";

import { useSearchParams } from "next/navigation";
import NotificationExamCode from "@/components/notifications/notificationExamCode";

export default function ExamcodePage() {
  const searchParams = useSearchParams();

  const link = searchParams.get("link") ?? "";
  const date = searchParams.get("date") ?? "";
  const formatted_date = searchParams.get("formatted_date") ?? "";
  const title = searchParams.get("title") ?? "";

  if (!link || !date || !formatted_date || !title) {
    console.log({ link, date, formatted_date, title });
    return <p>Invalid notification link</p>;
  }

  return (
    <NotificationExamCode
      link={link}
      date={date}
      formatted_date={formatted_date}
      title={title}
    />
  );
}

