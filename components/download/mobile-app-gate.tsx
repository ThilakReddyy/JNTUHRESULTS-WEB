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

  const showAppBanner =
    !bypassAppGate &&
    !isSkipped &&
    (deviceStatus === "android" || deviceStatus === "ios");
  const isAndroid = deviceStatus === "android";

  return (
    <>
      {children}
      {showAppBanner && (
        <aside
          aria-label="Download the JNTUH Connect mobile app"
          className="fixed inset-x-3 bottom-3 z-[9999] border border-border bg-card p-3 text-foreground shadow-[4px_4px_0_hsl(var(--border)/0.2)] sm:left-auto sm:right-4 sm:w-[26rem]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background">
              {isAndroid ? (
                <FaGooglePlay
                  className="text-green-600 dark:text-green-400"
                  size={22}
                  aria-hidden="true"
                />
              ) : (
                <FaApple size={24} aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold uppercase tracking-[0.06em]">
                JNTUH Connect mobile app
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Get it from {isAndroid ? "Google Play" : "the App Store"}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSkipped(true)}
              className="px-2 py-1 text-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Dismiss app download banner"
            >
              ×
            </button>
          </div>
          <div className="mt-3 flex gap-2 border-t border-border pt-3">
            <a
              href={isAndroid ? PLAY_STORE_URL : APP_STORE_URL}
              className="inline-flex flex-1 items-center justify-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              {isAndroid ? <FaGooglePlay aria-hidden="true" /> : <FaApple aria-hidden="true" />}
              Download app
            </a>
            <button
              type="button"
              onClick={() => setIsSkipped(true)}
              className="border border-border px-3 py-2 text-xs font-bold uppercase tracking-[0.06em] hover:bg-secondary"
            >
              Continue on web
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
