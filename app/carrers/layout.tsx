import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs and Careers",
  description:
    "Discover internships, jobs, and career opportunities for students and graduates.",
  alternates: { canonical: "/carrers" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
