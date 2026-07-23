"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getMobilePlatform,
  type MobilePlatform,
} from "@/customhooks/appdownloadhook";

type DeviceStatus = "checking" | MobilePlatform | "other";

const isGraceMarksRoute = (pathname: string) =>
  pathname === "/gracemarks" || pathname.startsWith("/gracemarks/");

export default function MobileAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>("checking");
  const bypassAppGate = isGraceMarksRoute(pathname);

  useEffect(() => {
    setDeviceStatus(getMobilePlatform() ?? "other");
  }, []);

  if (bypassAppGate || deviceStatus === "other") return children;

  if (deviceStatus === "checking") {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-background"
        aria-label="Checking device compatibility"
      />
    );
  }

  const isIOS = deviceStatus === "ios";
  const storeUrl = isIOS ? APP_STORE_URL : PLAY_STORE_URL;

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-sm text-center">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${
            isIOS ? "bg-white/10 text-white" : "bg-green-500/15 text-green-400"
          }`}
        >
          {isIOS ? (
            <FaApple size={42} aria-hidden="true" />
          ) : (
            <FaGooglePlay size={38} aria-hidden="true" />
          )}
        </div>
        <h1 className="mt-6 text-2xl font-bold">
          {isIOS
            ? "JNTUH Connect is now on iPhone and iPad"
            : "JNTUH Connect is now on Android"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {isIOS
            ? "JNTUH Connect is currently available through our iPhone and iPad app. Download it from the App Store to continue."
            : "JNTUH Connect is currently available only through our Android app. Download it from Google Play to continue."}
        </p>
        <a
          href={storeUrl}
          className={`mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3.5 font-semibold text-zinc-950 transition-colors ${
            isIOS
              ? "bg-white hover:bg-zinc-200 active:bg-zinc-300"
              : "bg-green-500 hover:bg-green-400 active:bg-green-600"
          }`}
        >
          {isIOS ? (
            <FaApple size={22} aria-hidden="true" />
          ) : (
            <FaGooglePlay size={20} aria-hidden="true" />
          )}
          {isIOS ? "Download on the App Store" : "Download on Google Play"}
        </a>
      </div>
    </div>
  );
}
