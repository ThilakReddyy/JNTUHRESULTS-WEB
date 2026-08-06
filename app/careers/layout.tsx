import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("careers");

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
