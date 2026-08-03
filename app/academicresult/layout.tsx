import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Result",
  description:
    "Check semester-wise JNTUH academic results, subject marks, grades, credits, SGPA, and CGPA using your hall ticket number.",
  alternates: { canonical: "/academicresult" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
