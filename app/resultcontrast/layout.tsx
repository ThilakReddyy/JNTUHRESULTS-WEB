import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Result Comparison",
  description:
    "Effortlessly track your academic progress at JNTUH by comparing your performance across semesters and against classmates. Gain valuable insights to improve your learning strategies.",
  alternates: { canonical: "/resultcontrast" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
