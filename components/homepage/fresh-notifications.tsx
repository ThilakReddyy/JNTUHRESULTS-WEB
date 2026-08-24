"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, BellRing } from "lucide-react";

import { useLatestNotifications } from "@/customhooks/uselatestnotifications";

type FreshNotification = Result & { category?: string };

const MAX_ITEMS = 5;

/** Local calendar day as YYYY-MM-DD, matching the API's releaseDate format. */
const isoDay = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const freshnessLabel = (releaseDate: string) => {
  const now = new Date();
  if (releaseDate === isoDay(now)) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (releaseDate === isoDay(yesterday)) return "Yesterday";

  return null;
};

const examCodeHref = (notification: FreshNotification) => {
  const query = new URLSearchParams({
    link: notification.link,
    title: notification.title,
    date: notification.date,
    formatted_date: notification.releaseDate,
  });

  return `/notifications/examcode?${query.toString()}`;
};

const FreshNotifications = () => {
  const notifications = useLatestNotifications();

  const fresh = useMemo(
    () =>
      notifications
        .map((notification: FreshNotification) => ({
          notification,
          label: freshnessLabel(notification.releaseDate),
        }))
        .filter(
          (entry): entry is { notification: FreshNotification; label: string } =>
            entry.label !== null,
        )
        .slice(0, MAX_ITEMS),
    [notifications],
  );

  if (fresh.length === 0) return null;

  const resultCount = fresh.filter(
    (entry) => entry.notification.category === "results",
  ).length;

  return (
    <section
      aria-labelledby="fresh-notifications-title"
      className="order-first border-b border-border bg-secondary md:order-none"
    >
      <div className="home-container px-4 py-6 sm:px-6 md:py-8">
        <div className="border border-foreground bg-card shadow-[4px_4px_0_hsl(var(--shadow))]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-foreground px-4 py-2.5 text-background">
            <h2
              id="fresh-notifications-title"
              className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping bg-background opacity-60" />
                <span className="relative inline-flex h-2 w-2 bg-background" />
              </span>
              {resultCount > 0 ? "New results just out" : "Fresh from JNTUH"}
            </h2>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] opacity-75 sm:inline">
              {fresh.length} update{fresh.length === 1 ? "" : "s"} in the last
              two days
            </span>
          </div>

          <ul className="divide-y divide-border">
            {fresh.map(({ notification, label }, index) => (
              <li
                key={notification.link + notification.title}
                className={index >= 3 ? "hidden md:block" : undefined}
              >
                <Link
                  href={examCodeHref(notification)}
                  className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-secondary"
                >
                  <span className="mt-0.5 shrink-0 border border-border bg-background px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="line-clamp-2 min-w-0 flex-1 text-sm font-medium leading-snug md:line-clamp-none">
                    {notification.title}
                  </span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-border px-4 py-2.5">
            <Link
              href="/notifications"
              className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] underline underline-offset-4 hover:text-foreground"
            >
              <BellRing size={13} aria-hidden="true" />
              All JNTUH notifications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshNotifications;
