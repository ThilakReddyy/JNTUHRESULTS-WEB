import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "JNTUH B.Tech, B.Pharamacy,M.Tech,B.Tech,M.B.A Results",
  keywords:
    "jntuh 1-1 results, jntuh 1-2 results, jntuh 2-1 results, jntuh 2-2 results, jntuh 3-1 results, jntuh 4-1 results, jntuh 4-2 results",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
