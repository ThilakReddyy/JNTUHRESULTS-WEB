import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | CLASS RESULT",
  description: "compare Academic Performance Across Semesters with Classmate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
