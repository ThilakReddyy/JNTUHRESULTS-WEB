"use client";

import { useEffect } from "react";
import { logger } from "@/lib/telemetry/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("route", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">
        We hit an unexpected error loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="border border-primary bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
      >
        Try again
      </button>
    </div>
  );
}
