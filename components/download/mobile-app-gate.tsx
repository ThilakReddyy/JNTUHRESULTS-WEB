"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getMobilePlatform,
} from "@/customhooks/appdownloadhook";

type DeviceStatus = "checking" | "mobile" | "other";

const isGraceMarksRoute = (pathname: string) =>
  pathname === "/gracemarks" || pathname.startsWith("/gracemarks/");

export default function MobileAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>("checking");
  const bypassAppGate = isGraceMarksRoute(pathname);

  useEffect(() => {
    setDeviceStatus(getMobilePlatform() ? "mobile" : "other");
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

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-20 w-28 items-center justify-center gap-4 rounded-3xl bg-white/10">
          <FaGooglePlay
            className="text-green-400"
            size={34}
            aria-hidden="true"
          />
          <FaApple size={38} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">JNTUH Connect is on mobile</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          JNTUH Connect is available on Google Play and the App Store. Download
          the app to continue.
        </p>
        <div className="mt-7 space-y-3">
          <a
            href={PLAY_STORE_URL}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-green-400 active:bg-green-600"
          >
            <FaGooglePlay size={20} aria-hidden="true" />
            Download from Google Play
          </a>
          <a
            href={APP_STORE_URL}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 active:bg-zinc-300"
          >
            <FaApple size={22} aria-hidden="true" />
            Download from the App Store
          </a>
        </div>
      </div>
    </div>
  );
}
