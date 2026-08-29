"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Lock } from "lucide-react";

import { setupPush } from "@/customhooks/setupPush";

type Destination = {
  id: string;
  label: string;
  path: string;
  /** Subscribe the browser to result notifications before navigating. */
  push?: boolean;
};

const destinations: Destination[] = [
  {
    id: "academicresult",
    label: "Academic result — semester wise",
    path: "/academicresult/result",
    push: true,
  },
  {
    id: "academicallresult",
    label: "All results — every attempt",
    path: "/academicallresult/result",
  },
  {
    id: "backlogreport",
    label: "Backlog report",
    path: "/backlogreport/result",
  },
  {
    id: "creditchecker",
    label: "Credits checker",
    path: "/creditchecker/result",
  },
  {
    id: "classresult",
    label: "Class result",
    path: "/classresult/result",
    push: true,
  },
  {
    id: "journey",
    label: "Academic journey",
    path: "/journey/result",
  },
  {
    id: "wrapped",
    label: "JNTUH Wrapped",
    path: "/wrapped/result",
  },
];

const secondaryLinks = [
  { label: "Compare with a friend", href: "/resultcontrast" },
  { label: "Notifications", href: "/notifications" },
  { label: "Syllabus", href: "/syllabus" },
  { label: "Academic calendars", href: "/calendars" },
];

const HALL_TICKET_PATTERN = /^[A-Za-z0-9]{10}$/;
const COOLDOWN_MS = 10000;

const Hero = () => {
  const router = useRouter();
  const [hallticketno, setHallticketno] = useState("");
  const [destinationId, setDestinationId] = useState(destinations[0].id);
  const [isCooldown, setIsCooldown] = useState(false);
  // Validation lives in the card rather than in a toast: the message has to sit
  // next to the field it is about, including on mobile where a bottom-right
  // toast is easy to miss.
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (isCooldown) return;

    const htno = hallticketno.trim().toUpperCase();

    if (htno.length === 0) {
      setError("Enter a hall ticket number to continue.");
      return;
    }

    if (!HALL_TICKET_PATTERN.test(htno)) {
      setError("A hall ticket number is 10 letters and digits.");
      return;
    }

    setError(null);

    const destination =
      destinations.find((entry) => entry.id === destinationId) ??
      destinations[0];

    setIsCooldown(true);

    try {
      if (destination.push) {
        await setupPush(htno);
      }
    } catch (error) {
      console.log("Error while setting up push notifications :", error);
    }

    router.push(`${destination.path}?htno=${htno}`);

    setTimeout(() => {
      setIsCooldown(false);
      toast.dismiss();
    }, COOLDOWN_MS);
  };

  return (
    <section className="border-b border-border bg-card">
      <div className="home-container grid gap-8 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-x-12 lg:gap-y-10 lg:pb-16 lg:pt-16">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.22em] text-muted-foreground sm:text-[11px] sm:tracking-[0.28em]">
            Jawaharlal Nehru Technological University, Hyderabad
          </p>

          <h1 className="mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            JNTUH results, read the way you{" "}
            <span className="text-highlight">actually</span> need them.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            One hall ticket number gives you every semester, every attempt, your
            SGPA and CGPA, pending backlogs and earned credits — merged,
            calculated and cached so it loads instantly.
          </p>
        </div>

        <form
          className="border border-border bg-background shadow-[4px_4px_0_hsl(var(--shadow))] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
          toolname="check_jntuh_result"
          tooldescription="Look up a JNTUH result for a hall ticket number and open the selected result view."
          toolautosubmit=""
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-4 py-2.5">
            <h2 className="text-sm font-extrabold tracking-tight text-secondary-foreground">
              Look up a result
            </h2>
            <span className="whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              &lt;40ms cached
            </span>
          </div>

          <div className="grid gap-4 p-4">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Hall ticket number
              </span>
              <input
                className="h-12 w-full min-w-0 border border-input bg-background px-3 text-base uppercase tracking-[0.14em] outline-none placeholder:normal-case placeholder:tracking-normal focus:border-foreground focus:ring-1 focus:ring-ring aria-[invalid=true]:border-highlight"
                name="htno1"
                type="text"
                required
                inputMode="text"
                autoComplete="on"
                minLength={10}
                maxLength={10}
                pattern="[A-Za-z0-9]{10}"
                aria-label="Hall ticket number"
                aria-invalid={error !== null}
                aria-describedby={error ? "hero-lookup-error" : undefined}
                toolparamdescription="A 10-character JNTUH student hall ticket number."
                placeholder="e.g. 20XX1A0000"
                value={hallticketno}
                onChange={(event) => {
                  setHallticketno(event.target.value.toUpperCase());
                  if (error) setError(null);
                }}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Show me
              </span>
              <select
                className="h-12 w-full min-w-0 border border-input bg-background px-3 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring"
                name="view"
                aria-label="Result view"
                toolparamdescription="Which result view to open for the hall ticket number."
                value={destinationId}
                onChange={(event) => setDestinationId(event.target.value)}
              >
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={isCooldown}
              className="inline-flex h-12 w-full items-center justify-center gap-2 border border-primary bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCooldown ? "Fetching" : "Get result"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            {error ? (
              <p
                id="hero-lookup-error"
                role="alert"
                className="border-l-2 border-highlight bg-highlight/10 px-3 py-2.5 font-mono text-xs leading-relaxed text-highlight-ink"
              >
                {error}
              </p>
            ) : null}
          </div>

          <p className="flex items-start gap-2 border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            <Lock size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
            No sign-in, no personal details stored. Your hall ticket number is
            only used to fetch the result you asked for.
          </p>
        </form>

        <div className="flex flex-wrap items-center gap-2 lg:col-start-1 lg:row-start-2 lg:self-start">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Also popular
          </span>
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
