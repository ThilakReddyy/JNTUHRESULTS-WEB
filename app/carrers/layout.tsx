import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH RESULTS | JOBS & CARRERS",
  description:
    "Discover career opportunities!! Find internships, jobs and kick start your journey!!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
