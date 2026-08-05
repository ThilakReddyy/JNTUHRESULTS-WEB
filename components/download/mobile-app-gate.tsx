"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getMobilePlatform,
  type MobilePlatform,
} from "@/customhooks/appdownloadhook";

const APP_BANNER_DISMISSED_KEY = "jntuh-app-banner-dismissed";

const isGraceMarksRoute = (pathname: string) =>
  pathname === "/gracemarks" || pathname.startsWith("/gracemarks/");

export default function MobileAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [platform, setPlatform] = useState<MobilePlatform | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);
  const bypassAppBanner = isGraceMarksRoute(pathname);

  useEffect(() => {
    if (bypassAppBanner) return;

    const mobilePlatform = getMobilePlatform();
    if (!mobilePlatform) return;

    setPlatform(mobilePlatform);

    try {
      setIsDismissed(
        sessionStorage.getItem(APP_BANNER_DISMISSED_KEY) === "true",
      );
    } catch {
      setIsDismissed(false);
    }
  }, [bypassAppBanner]);

  const dismissBanner = () => {
    setIsDismissed(true);

    try {
      sessionStorage.setItem(APP_BANNER_DISMISSED_KEY, "true");
    } catch {
      // The banner still stays dismissed for the current render.
    }
  };

  const showAppBanner =
    false && !bypassAppBanner && !isDismissed && platform !== null;
  const isAndroid = platform === "android";

  return (
    <>
      {children}
      {showAppBanner && (
        <aside
          aria-label="Download the JNTUH Connect mobile app"
          className="fixed inset-x-0 bottom-0 z-[9999] border-t border-border bg-card/95 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 text-card-foreground shadow-[0_-10px_30px_hsl(var(--foreground)/0.12)] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto max-w-md">
            <button
              type="button"
              onClick={dismissBanner}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Dismiss app download banner"
            >
              <IoClose size={22} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3 pr-9">
              <Image
                src="/icon-192x192.png"
                alt=""
                width={52}
                height={52}
                className="h-[52px] w-[52px] shrink-0 border border-border bg-background"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Better on mobile
                </p>
                <p className="mt-0.5 text-base font-extrabold leading-tight">
                  Get the JNTUH Connect app
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Faster results, instant alerts and easy access on the go.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
              <a
                href={isAndroid ? PLAY_STORE_URL : APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-primary bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isAndroid ? (
                  <FaGooglePlay aria-hidden="true" />
                ) : (
                  <FaApple size={18} aria-hidden="true" />
                )}
                {isAndroid
                  ? "Get it on Google Play"
                  : "Download on the App Store"}
              </a>
              <button
                type="button"
                onClick={dismissBanner}
                className="min-h-11 border border-border px-4 py-2 text-sm font-bold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Not now
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
