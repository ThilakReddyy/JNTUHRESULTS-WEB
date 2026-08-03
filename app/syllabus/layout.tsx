import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Syllabus",
  description: "Find JNTUH course syllabi organized by program, regulation, and academic year.",
  alternates: { canonical: "/syllabus" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
