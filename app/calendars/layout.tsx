import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Calendars",
  description: "Browse current JNTUH academic calendars for supported courses and regulations.",
  alternates: { canonical: "/calendars" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
