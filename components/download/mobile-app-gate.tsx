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
  const [isSkipped, setIsSkipped] = useState(false);
  const bypassAppGate = isGraceMarksRoute(pathname);

  useEffect(() => {
    setDeviceStatus(getMobilePlatform() ?? "other");
  }, []);

  if (bypassAppGate || deviceStatus === "other" || isSkipped) return children;

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
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-background px-4 text-foreground sm:px-6">
      <button
        type="button"
        onClick={() => setIsSkipped(true)}
        className="absolute right-4 top-4 border border-border bg-card px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Skip
      </button>
      <section className="w-full max-w-md border border-border bg-card text-center shadow-[5px_5px_0_hsl(var(--border)/0.2)]">
        <div className="border-b border-border bg-secondary px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-secondary-foreground">
          Mobile Access
        </div>
        <div className="p-6 sm:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center border border-border bg-background">
            {isAndroid ? (
              <FaGooglePlay
                className="text-green-600 dark:text-green-400"
                size={34}
                aria-hidden="true"
              />
            ) : (
              <FaApple size={38} aria-hidden="true" />
            )}
          </div>
          <h1 className="mt-6 text-xl font-extrabold uppercase tracking-[0.08em] sm:text-2xl">
            JNTUH Connect is on mobile
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Download JNTUH Connect from{" "}
            {isAndroid ? "Google Play" : "the App Store"} to continue.
          </p>
          <div className="mt-7 border-t border-border pt-5">
            <a
              href={isAndroid ? PLAY_STORE_URL : APP_STORE_URL}
              className="inline-flex w-full items-center justify-center gap-3 border border-primary bg-primary px-5 py-3.5 font-bold uppercase tracking-[0.08em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
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
      </section>
    </div>
  );
}
