import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | ACADEMIC RESULT",
  description: "Check out academic result with in a go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
