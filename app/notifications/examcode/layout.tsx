import type { Metadata } from "next";
import ResultPageLayout from "@/components/results/result-page-layout";

export const metadata: Metadata = {
  title: "Exam Notification Details",
  description:
    "View JNTUH B.Tech, B.Pharmacy, M.Tech, M.Pharmacy, MBA, and MCA examination notification details.",
  alternates: { canonical: "/notifications/examcode" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResultPageLayout>{children}</ResultPageLayout>;
}
