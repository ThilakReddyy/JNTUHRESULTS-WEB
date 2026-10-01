import type { Metadata } from "next";
import ResultPageLayout from "@/components/results/result-page-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("examNotification", { noIndex: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResultPageLayout>{children}</ResultPageLayout>;
}
