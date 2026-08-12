"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CONTACT_COLLAB = "https://dhethi.com/#contact?intent=collab";
const CONTACT_SERVICE = "https://dhethi.com/#contact?intent=service";

const PROOF_POINTS = [
  { value: "4K+", label: "daily users" },
  { value: "22K+", label: "API calls/day" },
  { value: "<40ms", label: "responses" },
  { value: "$14/mo", label: "to run it all" },
];

const AdComponent = () => {
  return (
    <div className="mx-auto mt-6 max-w-4xl px-4 pb-8">
      <div className="border border-border bg-card text-card-foreground">
        <div className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-muted-foreground">
            Built by Dhethi
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            dhethi.com
          </span>
        </div>

        <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:gap-5">
          <span
            aria-hidden="true"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background text-lg font-semibold tracking-tight text-foreground"
          >
            d.
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              You&apos;re using something we built.
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              JNTUH Connect — web, API, Android, iOS — is ours. Same team can
              build yours. Have an idea and no team yet? Let&apos;s build it
              together. Need something made? We ship.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border bg-background/40 px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
          <Link
            href={CONTACT_COLLAB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 border border-foreground bg-foreground px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Have an idea? Let&apos;s build it
            <ArrowUpRight size={13} className="shrink-0" />
          </Link>
          <Link
            href={CONTACT_SERVICE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 border border-border bg-background px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Need something built? Talk to us
            <ArrowUpRight size={13} className="shrink-0" />
          </Link>
        </div>

        <dl className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
          {PROOF_POINTS.map((point, index) => {
            const borders = [
              "border-r border-b border-border sm:border-b-0",
              "border-b border-border sm:border-b-0 sm:border-r sm:border-border",
              "border-r border-border",
              "",
            ][index];
            return (
              <div
                key={point.label}
                className={`flex flex-col gap-0.5 px-4 py-3 ${borders}`}
              >
                <dt className="text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {point.label}
                </dt>
                <dd className="text-sm font-semibold tracking-tight text-foreground">
                  {point.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default AdComponent;
