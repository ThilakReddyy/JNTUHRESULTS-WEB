import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | FAQ",
  description: "Frequently Asked questions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
