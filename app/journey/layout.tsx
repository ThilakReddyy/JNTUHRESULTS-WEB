import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH CONNECT | Your Academic Journey",
  description:
    "Discover your 4-year JNTUH academic story — SGPA arc, achievement badges, semester narratives, and an interactive CGPA dream simulator.",
};

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
