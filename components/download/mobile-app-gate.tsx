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

const APP_PROMPT_DISMISSED_KEY = "jntuh-app-prompt-dismissed";
const APP_PROMPT_INTERACTIONS = ["pointerdown", "keydown"] as const;

const isGraceMarksRoute = (pathname: string) =>
  pathname === "/gracemarks" || pathname.startsWith("/gracemarks/");

export default function MobileAppGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [deviceStatus, setDeviceStatus] = useState<MobilePlatform | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isPromptReady, setIsPromptReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const bypassAppGate = isGraceMarksRoute(pathname);

  useEffect(() => {
    if (bypassAppGate) return;

    const removeInteractionListeners = () => {
      APP_PROMPT_INTERACTIONS.forEach((eventName) => {
        window.removeEventListener(eventName, revealPrompt);
      });
    };

    const revealPrompt = () => {
      removeInteractionListeners();

      try {
        if (sessionStorage.getItem(APP_PROMPT_DISMISSED_KEY) === "true") {
          return;
        }
      } catch {
        // Continue without persistence when session storage is unavailable.
      }

      const platform = getMobilePlatform();
      if (!platform) return;

      setDeviceStatus(platform);
      setIsPromptReady(true);
    };

    APP_PROMPT_INTERACTIONS.forEach((eventName) => {
      window.addEventListener(eventName, revealPrompt, {
        once: true,
        passive: true,
      });
    });

    return removeInteractionListeners;
  }, [bypassAppGate]);

  const dismissPrompt = () => {
    setIsSkipped(true);
    setIsExpanded(false);
    try {
      sessionStorage.setItem(APP_PROMPT_DISMISSED_KEY, "true");
    } catch {
      // Dismiss for the current render when session storage is unavailable.
    }
  };

  const showAppPrompt =
    !bypassAppGate &&
    !isSkipped &&
    isPromptReady &&
    deviceStatus !== null;
  const isAndroid = deviceStatus === "android";

  return (
    <>
      {children}
      {showAppPrompt && !isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-3 right-3 z-[9999] inline-flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.06em] text-primary-foreground shadow-[3px_3px_0_hsl(var(--border)/0.2)] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open the JNTUH Connect app download options"
        >
          {isAndroid ? (
            <FaGooglePlay size={16} aria-hidden="true" />
          ) : (
            <FaApple size={17} aria-hidden="true" />
          )}
          Get the app
        </button>
      )}
      {showAppPrompt && isExpanded && (
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
              onClick={dismissPrompt}
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
              {isAndroid ? (
                <FaGooglePlay aria-hidden="true" />
              ) : (
                <FaApple aria-hidden="true" />
              )}
              Download app
            </a>
            <button
              type="button"
              onClick={dismissPrompt}
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
