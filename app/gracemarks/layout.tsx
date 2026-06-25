import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH CONNECT | GRACE MARKS PROOF",
  description:
    "Check your grace marks eligibility for JNTUH B.Tech and B.Pharm exams and upload your supporting proof in a single, guided flow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
