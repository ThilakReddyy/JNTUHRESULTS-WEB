import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Academic Results",
  description:
    "View all available JNTUH academic results across semesters using your hall ticket number.",
  alternates: { canonical: "/academicallresult" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
