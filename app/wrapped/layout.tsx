import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Year Wrapped",
  description: "Explore your JNTUH academic year through a personalized result story.",
  alternates: { canonical: "/wrapped" },
};

export default function WrappedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
