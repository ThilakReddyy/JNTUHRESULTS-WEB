import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

import {
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/customhooks/appdownloadhook";

export default function DesktopAppDownload() {
  return (
    <section
      aria-labelledby="desktop-app-download-title"
      className="mx-auto mt-5 hidden w-[calc(100%-2rem)] max-w-4xl items-center justify-between gap-8 border border-border bg-card px-7 py-5 text-card-foreground shadow-[3px_3px_0_hsl(var(--border)/0.16)] md:flex"
    >
      <div className="flex min-w-0 items-center gap-4 text-left">
        <Image
          src="/icon-192x192.png"
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 border border-border bg-background"
        />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Available on mobile
          </p>
          <h2
            id="desktop-app-download-title"
            className="mt-1 text-xl font-extrabold"
          >
            Take JNTUH Connect with you
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Get results, notifications, syllabus, and more in the mobile app.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download JNTUH Connect from Google Play"
          className="inline-flex min-h-12 items-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FaGooglePlay size={18} aria-hidden="true" />
          Google Play
        </a>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download JNTUH Connect from the App Store"
          className="inline-flex min-h-12 items-center gap-2 border border-border bg-background px-4 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FaApple size={21} aria-hidden="true" />
          App Store
        </a>
      </div>
    </section>
  );
}
