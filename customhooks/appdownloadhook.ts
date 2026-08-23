"use client";

import { useEffect, useState } from "react";

export type MobilePlatform = "android" | "ios";

export { PLAY_STORE_URL, APP_STORE_URL } from "@/lib/app-links";

export const getMobilePlatform = (): MobilePlatform | null => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("android")) return "android";

  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isIPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return isIOS || isIPadOS ? "ios" : null;
};

export const useMobilePlatform = () => {
  const [platform, setPlatform] = useState<MobilePlatform | null>(null);

  useEffect(() => {
    setPlatform(getMobilePlatform());
  }, []);

  return platform;
};
