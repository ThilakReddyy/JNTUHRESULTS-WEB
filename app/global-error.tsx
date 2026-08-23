"use client";

import { useEffect } from "react";
import { logger } from "@/lib/telemetry/logger";

// Catches errors thrown by the root layout itself, which app/error.tsx
// cannot — Next.js requires this boundary to render its own <html>/<body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("root-layout", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">
            The app failed to load. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="border border-primary bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
