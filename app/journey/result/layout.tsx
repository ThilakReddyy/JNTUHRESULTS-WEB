import type { Metadata } from "next";
import ResultPageLayout from "@/components/results/result-page-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("journey", {
  title: "Academic Journey Details",
  path: "/journey/result",
  noIndex: true,
});

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResultPageLayout>{children}</ResultPageLayout>;
}
