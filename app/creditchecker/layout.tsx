import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Checker",
  description:
    "Check secured JNTUH credits and estimate the credits required for promotion to the next academic year.",
  alternates: { canonical: "/creditchecker" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
