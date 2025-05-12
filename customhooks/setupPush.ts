import { v4 as uuidv4 } from "uuid";

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

    console.log("Registering SW...");
    await navigator.serviceWorker.register("/sw.js");

    console.log("Waiting for ready...");
    const reg = await navigator.serviceWorker.ready;

    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
    console.log("Using VAPID Key:", key);

    const convertedKey = urlBase64ToUint8Array(key);
    console.log("Converted key:", convertedKey);

    console.log("Subscribing to pushManager...");
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    console.log("Subscription success!", sub);

    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

    await fetch(`${url}save-subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        anon_id: anonId,
        roll_number: rollNumber || null,
        subscription: sub,
      }),
    });

    console.log("Subscription saved.");
  } catch (err) {
    console.error("❌ Push setup failed:", err);
  }
}
