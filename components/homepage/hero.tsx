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

  const onSubmit = async () => {
    if (isCooldown) return;

    const htno = hallticketno.trim().toUpperCase();

    if (!HALL_TICKET_PATTERN.test(htno)) {
      toast.error("The hall ticket should be 10 characters");
      return;
    }

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
      <div className="home-container px-4 pb-10 pt-6 sm:px-6 md:pb-14 md:pt-14">
        <p className="md:inline-flex border border-border bg-secondary px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-secondary-foreground  ">
          Jawaharlal Nehru Technological University, Hyderabad
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          JNTUH results, read the way you
          <span className="text-muted-foreground"> actually need them.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          One hall ticket number gives you every semester, every attempt, your
          SGPA and CGPA, pending backlogs and earned credits — merged,
          calculated and cached so it loads instantly.
        </p>

        <form
          className="mt-8 border border-border bg-background shadow-[4px_4px_0_hsl(var(--shadow))]"
          toolname="check_jntuh_result"
          tooldescription="Look up a JNTUH result for a hall ticket number and open the selected result view."
          toolautosubmit=""
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
        >
          <div className="border-b border-border bg-secondary px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-secondary-foreground">
            Look up a result
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:items-end">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Hall ticket number
              </span>
              <input
                className="h-12 w-full min-w-0 border border-input bg-background px-3 text-base uppercase tracking-[0.14em] outline-none placeholder:normal-case placeholder:tracking-normal focus:border-foreground focus:ring-1 focus:ring-ring"
                name="htno1"
                type="text"
                required
                inputMode="text"
                autoComplete="on"
                minLength={10}
                maxLength={10}
                pattern="[A-Za-z0-9]{10}"
                aria-label="Hall ticket number"
                toolparamdescription="A 10-character JNTUH student hall ticket number."
                placeholder="e.g. 20XX1A0000"
                value={hallticketno}
                onChange={(event) =>
                  setHallticketno(event.target.value.toUpperCase())
                }
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
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
              className="inline-flex h-12 items-center justify-center gap-2 border border-primary bg-primary px-6 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCooldown ? "Fetching" : "Get result"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <p className="flex items-center gap-2 border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <Lock size={12} aria-hidden="true" className="shrink-0" />
            No sign-in, no personal details stored. Your hall ticket number is
            only used to fetch the result you asked for.
          </p>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
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
