import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Results and Academic Tools",
  description:
    "Check JNTUH UG and PG exam results, grades, CGPA, backlogs, credits, notifications, syllabi, and academic calendars in one place.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-blur-fade ">{children}</div>;
}
