import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | CALENDARS",
  description: "All Academic Calendars for the current year.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
