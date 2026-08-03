import { Suspense, type ReactNode } from "react";

export default function ResultPageLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
