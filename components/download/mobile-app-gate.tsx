"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getMobilePlatform,
} from "@/customhooks/appdownloadhook";

const MOBILE_GATE_EXEMPT_ROUTES = ["/gracemarks", "/helpcenter", "/faq"];

const isExemptRoute = (pathname: string) =>
  MOBILE_GATE_EXEMPT_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export default function MobileAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bypassMobileGate = isExemptRoute(pathname);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      "mobile-app-gated",
      "mobile-platform-android",
      "mobile-platform-ios",
    );

    if (bypassMobileGate) return;

    const mobilePlatform = getMobilePlatform();
    if (!mobilePlatform) return;

    root.classList.add("mobile-app-gated", `mobile-platform-${mobilePlatform}`);
  }, [bypassMobileGate]);

  return (
    <>
      {children}
      <main className="mobile-app-gate fixed inset-0 z-[9999] min-h-[100dvh] overflow-y-auto bg-background text-foreground">
        <div className="m-auto flex w-full max-w-lg flex-col items-center px-6 py-[max(2rem,env(safe-area-inset-top))] text-center">
          <Image
            src="/icon-192x192.png"
            alt="JNTUH Connect app icon"
            width={96}
            height={96}
            priority
            className="h-24 w-24 rounded-2xl border border-border bg-card shadow-lg"
          />

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            JNTUH Connect mobile
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            Continue in the app
          </h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            JNTUH Connect is available on mobile exclusively through the app.
            Install it to access results, notifications, syllabus, and more.
          </p>

          <a
            href={PLAY_STORE_URL}
            aria-label="Download JNTUH Connect from Google Play"
            className="mobile-app-store-android mt-8 min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-lg transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <FaGooglePlay size={22} aria-hidden="true" />
            Get it on Google Play
          </a>
          <a
            href={APP_STORE_URL}
            aria-label="Download JNTUH Connect from the App Store"
            className="mobile-app-store-ios mt-8 min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-lg transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <FaApple size={25} aria-hidden="true" />
            Download on the App Store
          </a>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            The website remains available on desktop computers.
          </p>
        </div>
      </main>
    </>
  );
}
