import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH CONNECT | GRACE MARKS REVIEW",
  description:
    "Internal review tool for grace-marks proofs submitted by JNTUH students.",
  robots: { index: false, follow: false },
};

export default function GraceMarksAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
