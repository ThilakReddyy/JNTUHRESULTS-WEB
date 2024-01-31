import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | CREDIT CHECKER",
  description:
    "check your credits and find the credits required to promote to next year.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
