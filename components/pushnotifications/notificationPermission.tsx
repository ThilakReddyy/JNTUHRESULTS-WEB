import { logger } from "@/lib/telemetry/logger";

export async function askNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    logger.warn(
      "push",
      "Notification API not available on server or unsupported browser.",
    );
    return false;
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return false;
  }

  return true;
}
