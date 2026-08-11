"use client";
import React from "react";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import AdComponent from "../ads/adcomponent";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/customhooks/appdownloadhook";

const Footer = () => {
  return (
    <>
      <div className="mx-auto mt-10 max-w-4xl border-t border-border px-4 py-6">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Also available on
          </span>
          <div className="flex flex-row items-center justify-center gap-2.5">
            <Link
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get JNTUH Connect on Google Play"
              className="inline-flex items-center gap-2.5 border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent"
            >
              <FaGooglePlay className="shrink-0" size={16} />
              <span className="text-sm font-medium">Google Play</span>
            </Link>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download JNTUH Connect on the App Store"
              className="inline-flex items-center gap-2.5 border border-border bg-card px-4 py-2 text-foreground transition-colors hover:bg-accent"
            >
              <FaApple className="shrink-0" size={18} />
              <span className="text-sm font-medium">App Store</span>
            </Link>
          </div>
        </div>
      </div>
      <AdComponent />
    </>
  );
};

export default Footer;
