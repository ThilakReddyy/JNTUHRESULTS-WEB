import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import { PlugZap, Radio } from "lucide-react";

import { openSourceRepositories } from "@/constants/homestats";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/customhooks/appdownloadhook";

const PlatformBand = () => {
  return (
    <section
      aria-labelledby="platform-band-title"
      className="border-y border-border bg-secondary"
    >
      <div className="home-container px-4 py-10 sm:px-6 md:py-12">
        <h2
          id="platform-band-title"
          className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Four ways to stay on top of your results
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Image
                src="/icon-192x192.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 border border-border bg-background"
              />
              <h3 className="text-base font-extrabold tracking-tight">
                Android &amp; iOS apps
              </h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Native apps — not a wrapped website — that push a notification the
              moment a result for your hall ticket goes live.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download JNTUH Connect from Google Play"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-primary bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
              >
                <FaGooglePlay size={15} aria-hidden="true" />
                Google Play
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download JNTUH Connect on the App Store"
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-border bg-background px-4 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <FaApple size={17} aria-hidden="true" />
                App Store
              </a>
            </div>
          </div>

          <div className="flex flex-col border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background">
                <Radio size={19} aria-hidden="true" />
              </span>
              <h3 className="text-base font-extrabold tracking-tight">
                Telegram &amp; WhatsApp
              </h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Prefer alerts where you already are? Join the broadcast channels
              and get every result announcement as it drops.
            </p>
            <Link
              href="/channels"
              className="mt-5 inline-flex min-h-11 items-center justify-center border border-border bg-background px-4 text-sm font-bold transition-colors hover:bg-secondary"
            >
              Join a channel
            </Link>
          </div>

          <div className="flex flex-col border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background">
                <PlugZap size={19} aria-hidden="true" />
              </span>
              <h3 className="text-base font-extrabold tracking-tight">
                Open source &amp; MCP
              </h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              The web app, FastAPI backend and both mobile clients are public.
              Or plug the MCP server into your AI assistant and just ask.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {openSourceRepositories.map((repository) => (
                <a
                  key={repository.href}
                  href={repository.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                >
                  <FaGithub size={12} aria-hidden="true" />
                  {repository.label}
                </a>
              ))}
              <Link
                href="/mcp"
                className="inline-flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
              >
                <PlugZap size={12} aria-hidden="true" />
                MCP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformBand;
