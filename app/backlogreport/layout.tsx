import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | BACKLOG ASSESMENT",
  description: "Check out backlogs result with in a go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
