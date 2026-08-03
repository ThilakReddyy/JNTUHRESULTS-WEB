import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grace Marks Eligibility",
  description:
    "Check your grace marks eligibility for JNTUH B.Tech and B.Pharm exams and upload your supporting proof in a single, guided flow.",
  alternates: { canonical: "/gracemarks" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
