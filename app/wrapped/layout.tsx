import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("wrapped");

export default function WrappedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
