import NotificationExamCode from "@/components/notifications/notificationExamCode";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    link?: string;
    date?: string;
    formatted_date?: string;
    title?: string;
  };
}) {
  const { title = "", formatted_date = "", date = "" } = searchParams;

  return {
    title: title ? `${title} | JNTUH RESULTS` : "JNTUH RESULTS | Notifications",
    description: title
      ? `Check ${title} released on ${formatted_date || date}.`
      : "Check out JNTUH notifications in one place.",
    openGraph: {
      title: title || "JNTUH RESULTS",
      description: `Exam Notification - ${title} (${formatted_date || date})`,
      type: "website",
      siteName: "JNTUH RESULTS",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "JNTUH RESULTS",
      description: `Exam Notification - ${title} (${formatted_date || date})`,
    },
  };
}

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
