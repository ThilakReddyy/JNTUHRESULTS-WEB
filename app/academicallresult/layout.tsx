import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | ACADEMIC ALL RESULT",
  description:
    "Find your JNTUH all your academic results quickly and effortlessly. Easy access, comprehensive information, all in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
