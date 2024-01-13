import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | NOTIFICATIONS",
  description: "Check out notifications with in a go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
