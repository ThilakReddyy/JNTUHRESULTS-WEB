import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS - Check Your UG & PG Exam Results Online",
  description:
    "Easily access your JNTUH results for {relevant course and semester} - Find out your grades, CGPA, backlogs, Jobs, Internships and more in one place. Check now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
