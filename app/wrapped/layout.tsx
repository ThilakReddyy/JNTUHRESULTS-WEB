import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH Wrapped",
  description: "Your academic year, told as a story.",
};

export default function WrappedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
