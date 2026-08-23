/**
 * Console wrapper that always scrubs student-data-shaped values before
 * printing (see lib/telemetry/scrub.ts), and forwards warn/error to GA as
 * an aggregate `client_error` count — there is no dedicated error-tracking
 * service (see architecture.md), so this is the closest thing to one.
 */

import { scrubText, scrubValue } from "@/lib/telemetry/scrub";
import { trackEvent } from "@/lib/telemetry/analytics";

type LogMessage = string | Error | unknown;

function toText(message: LogMessage): string {
  if (message instanceof Error) return message.message;
  if (typeof message === "string") return message;
  try {
    return JSON.stringify(message);
  } catch {
    return String(message);
  }
}

function format(scope: string, message: LogMessage): string {
  return `[${scope}] ${scrubText(toText(message))}`;
}

export const logger = {
  debug(scope: string, message: LogMessage, meta?: unknown): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(format(scope, message), meta ? scrubValue(meta) : "");
    }
  },
  info(scope: string, message: LogMessage, meta?: unknown): void {
    if (process.env.NODE_ENV !== "production") {
      console.info(format(scope, message), meta ? scrubValue(meta) : "");
    }
  },
  warn(scope: string, message: LogMessage, meta?: unknown): void {
    console.warn(format(scope, message), meta ? scrubValue(meta) : "");
    trackEvent("client_error", { scope, message: scrubText(toText(message)) });
  },
  error(scope: string, message: LogMessage, meta?: unknown): void {
    console.error(format(scope, message), meta ? scrubValue(meta) : "");
    trackEvent("client_error", { scope, message: scrubText(toText(message)) });
  },
};
