import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata("mcp");

export default function McpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
