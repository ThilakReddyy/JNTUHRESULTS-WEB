import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH CONNECT | SYLLABUS",
  description: "Get Syllabus with in a go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
