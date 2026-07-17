"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FaGooglePlay } from "react-icons/fa";

import { PLAY_STORE_URL } from "@/customhooks/appdownloadhook";

type DeviceStatus = "checking" | "android" | "other";

const isAndroidDevice = () => /android/i.test(window.navigator.userAgent);

export default function AndroidAppGate({ children }: { children: ReactNode }) {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>("checking");

  useEffect(() => {
    if (!isAndroidDevice()) {
      setDeviceStatus("other");
      return;
    }

    setDeviceStatus("android");
  }, []);

  if (deviceStatus === "other") return children;

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
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/15 text-green-400">
          <FaGooglePlay size={38} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">
          JNTUH Connect is now on Android
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          JNTUH Connect is currently available only through our Android app.
          Download it from Google Play to continue.
        </p>
        <a
          href={PLAY_STORE_URL}
          className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-5 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-green-400 active:bg-green-600"
        >
          <FaGooglePlay size={20} aria-hidden="true" />
          Download on Google Play
        </a>
      </div>
    </div>
  );
}
