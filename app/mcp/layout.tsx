import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Integration",
  description: "Learn how to connect supported AI tools with JNTUH Connect through MCP.",
  alternates: { canonical: "/mcp" },
};

export default function McpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
