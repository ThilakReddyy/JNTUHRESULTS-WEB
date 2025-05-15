import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS",
  description:
    "Get your JNTUH exam results (UG & PG) online easily! Get your grades, CGPA, and check for backlogs on the official JNTUH Vercel portal. Find jobs & internships too! Start now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-blur-fade ">{children}</div>;
}
