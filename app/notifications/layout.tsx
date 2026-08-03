import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Notifications",
  description: "Browse the latest JNTUH examination, academic, and university notifications.",
  alternates: { canonical: "/notifications" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
