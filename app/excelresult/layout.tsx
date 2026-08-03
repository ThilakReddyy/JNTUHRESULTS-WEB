import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Results to Excel",
  description: "Export supported JNTUH academic result data to an Excel spreadsheet.",
  alternates: { canonical: "/excelresult" },
};

export default function ExcelResultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
