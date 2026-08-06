import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("home");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-blur-fade ">{children}</div>;
}
