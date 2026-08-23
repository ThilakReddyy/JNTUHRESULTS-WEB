import { v4 as uuidv4 } from "uuid";
import { API_KEY, API_KEY_HEADER } from "@/lib/apiClient";
import { logger } from "@/lib/telemetry/logger";
import { trackEvent } from "@/lib/telemetry/analytics";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function setupPush(rollNumber?: string) {
  try {
    const anonId = localStorage.getItem("anonId") || uuidv4();
    localStorage.setItem("anonId", anonId);

    logger.debug("push", "Registering SW...");
    await navigator.serviceWorker.register("/sw.js");

    logger.debug("push", "Waiting for ready...");
    const reg = await navigator.serviceWorker.ready;

    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
    const convertedKey = urlBase64ToUint8Array(key);

    logger.debug("push", "Subscribing to pushManager...");
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

    const response = await fetch(`${url}save-subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json", [API_KEY_HEADER]: API_KEY },
      body: JSON.stringify({
        anon_id: anonId,
        roll_number: rollNumber || null,
        subscription: sub,
      }),
    });

    if (!response.ok) {
      throw new Error(`save-subscription responded ${response.status}`);
    }

    logger.debug("push", "Subscription saved.");
    trackEvent("push_subscription_success", {});
  } catch (err) {
    logger.error("push", err);
    trackEvent("push_subscription_failure", {});
  }
}
