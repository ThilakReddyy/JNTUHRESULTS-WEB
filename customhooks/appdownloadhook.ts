"use client";

import { useEffect, useState } from "react";

export type MobilePlatform = "android" | "ios";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect";
export const APP_STORE_URL =
  "https://apps.apple.com/in/app/jntuh-connect/id6790828236";

const getMobilePlatform = (): MobilePlatform | null => {
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
