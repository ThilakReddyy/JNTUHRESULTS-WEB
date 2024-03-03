import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | BACKLOG ASSESMENT",
  description:
    "Get a clear picture of your JNTUH academic standing with our easy-to-use backlog assessment tool. See your current backlog status and plan your next steps efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
