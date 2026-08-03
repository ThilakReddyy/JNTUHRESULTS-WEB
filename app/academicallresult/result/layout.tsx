import type { Metadata } from "next";
import ResultPageLayout from "@/components/results/result-page-layout";

export const metadata: Metadata = {
  title: "All Academic Result Details",
  robots: { index: false, follow: false },
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return <ResultPageLayout>{children}</ResultPageLayout>;
}
