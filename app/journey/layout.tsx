import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Academic Journey",
  description:
    "Discover your 4-year JNTUH academic story — SGPA arc, achievement badges, semester narratives, and an interactive CGPA dream simulator.",
  alternates: { canonical: "/journey" },
};

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
