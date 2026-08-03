import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Results",
  description:
    "Compare JNTUH academic performance and subject results across students in a class.",
  alternates: { canonical: "/classresult" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
