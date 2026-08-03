import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help using JNTUH Connect, report a problem, or find guidance for academic result tools.",
  alternates: { canonical: "/helpcenter" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
