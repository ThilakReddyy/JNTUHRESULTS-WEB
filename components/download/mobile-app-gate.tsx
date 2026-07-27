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

  const isAndroid = deviceStatus === "android";

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
          {isAndroid ? (
            <FaGooglePlay
              className="text-green-400"
              size={34}
              aria-hidden="true"
            />
          ) : (
            <FaApple size={38} aria-hidden="true" />
          )}
        </div>
        <h1 className="mt-6 text-2xl font-bold">JNTUH Connect is on mobile</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Download JNTUH Connect from{" "}
          {isAndroid ? "Google Play" : "the App Store"} to continue.
        </p>
        <div className="mt-7">
          <a
            href={isAndroid ? PLAY_STORE_URL : APP_STORE_URL}
            className={
              isAndroid
                ? "inline-flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-green-400 active:bg-green-600"
                : "inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 active:bg-zinc-300"
            }
          >
            {isAndroid ? (
              <FaGooglePlay size={20} aria-hidden="true" />
            ) : (
              <FaApple size={22} aria-hidden="true" />
            )}
            Download from {isAndroid ? "Google Play" : "the App Store"}
          </a>
        </div>
      </div>
    </div>
  );
}
