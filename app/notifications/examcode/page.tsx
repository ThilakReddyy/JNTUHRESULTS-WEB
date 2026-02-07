"use client"
import NotificationExamCode from "@/components/notifications/notificationExamCode";

export default function ExamcodePage({
  searchParams,
}: {
  searchParams: {
    link?: string;
    date?: string;
    formatted_date?: string;
    title?: string;
  };
}) {
  const {
    link = "",
    date = "",
    formatted_date = "",
    title = "",
  } = searchParams;

  if (!link || !date || !formatted_date || !title) {
    console.log("link:", link, "date:", date, "formatted_date:", formatted_date, "title:", title);
    return <p>Invalid notification link</p>;
  }

  return (
    <NotificationExamCode
      link={link.split("?")[1] || ""}
      date={date}
      formatted_date={formatted_date}
      title={title}
    />
  );
}
