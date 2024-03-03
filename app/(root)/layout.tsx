import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS",
  description:
    "Get your JNTUH exam results for UG & PG courses effortlessly. Access your grades, CGPA, identify backlogs, and explore job & internship opportunities - all on one platform. Check your results now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
