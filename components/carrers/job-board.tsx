"use client";

import {
  Briefcase,
  Building2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Laptop,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CompanyType, getJobs, JobRecord, JobType } from "@/lib/jobs";

const PAGE_SIZE = 12;

const formatJobType = (type: JobType) =>
  type === "INTERN"
    ? "Internship"
    : type === "PART_TIME"
      ? "Part time"
      : "Full time";

const formatSource = (source: string) => {
  const provider = source.split(":")[0];
  return provider.charAt(0).toUpperCase() + provider.slice(1);
};

const formatPostedDate = (value: string | null) => {
  if (!value) return "Recently verified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently verified";
  return `Posted ${new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date)}`;
};

const experienceLabel = (job: JobRecord) => {
  if (job.type === "INTERN") return "Students & graduates";
  if (job.experienceMin !== null || job.experienceMax !== null) {
    const minimum = job.experienceMin ?? 0;
    const maximum = job.experienceMax;
    return maximum === null
      ? `${minimum}+ years`
      : `${minimum}–${maximum} years`;
  }
  return "Early career";
};

function JobCard({
  job,
  selected,
  onSelect,
}: {
  job: JobRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={`border bg-card p-4 text-card-foreground transition-colors sm:p-5 ${
        selected
          ? "border-foreground shadow-[4px_4px_0_hsl(var(--foreground))]"
          : "border-border hover:border-foreground"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${job.title} at ${job.companyCanonical || job.company}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="border border-border bg-secondary px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">
                {formatJobType(job.type)}
              </span>
              {job.isProductBased && (
                <span className="border border-amber-600/70 bg-amber-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-amber-950 dark:bg-amber-950 dark:text-amber-100">
                  Product company
                </span>
              )}
            </div>
            <h2 className="text-base font-extrabold leading-snug sm:text-lg">
              {job.title}
            </h2>
          </div>
          <ChevronRight
            className="mt-1 shrink-0"
            size={18}
            aria-hidden="true"
          />
        </div>

        <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <span className="flex min-w-0 items-center gap-2">
            <Building2 size={15} className="shrink-0" aria-hidden="true" />
            <span className="truncate">
              {job.companyCanonical || job.company}
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <MapPin size={15} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{job.locations[0] || "India"}</span>
          </span>
          <span className="flex items-center gap-2">
            <GraduationCap size={15} aria-hidden="true" />
            {experienceLabel(job)}
          </span>
          <span className="flex items-center gap-2">
            <Laptop size={15} aria-hidden="true" />
            {job.isRemote ? "Remote eligible" : "Office / hybrid"}
          </span>
        </div>
      </button>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <span>{formatPostedDate(job.postedAt)}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-1 font-bold text-foreground underline-offset-4 hover:underline xl:hidden"
          >
            View details <ChevronRight size={13} aria-hidden="true" />
          </button>
          {job.applicationUrl && (
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-foreground underline-offset-4 hover:underline"
            >
              Apply <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function JobDetail({
  job,
  mobile = false,
}: {
  job: JobRecord;
  mobile?: boolean;
}) {
  const shareJob = async () => {
    const url = job.applicationUrl || window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${job.title} at ${job.companyCanonical || job.company}`,
          text: `Early-career opportunity: ${job.title}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Job link copied");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError")
        toast.error("Could not share this job");
    }
  };

  return (
    <aside
      className={
        mobile
          ? "min-h-full bg-card text-card-foreground"
          : "h-full overflow-y-auto overscroll-contain border border-border bg-card text-card-foreground"
      }
    >
      <div
        className={`document-band flex items-center justify-between gap-4 bg-secondary ${
          mobile ? "pr-14" : "sticky top-0 z-20"
        }`}
      >
        <span>Opportunity brief</span>
        <span>{formatSource(job.source)} source</span>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap gap-2">
          <span className="border border-border bg-secondary px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">
            {formatJobType(job.type)}
          </span>
          <span className="border border-border px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]">
            {job.companyType.toLowerCase()} company
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
          {job.title}
        </h2>
        <p className="mt-2 text-base font-bold text-muted-foreground">
          {job.companyCanonical || job.company}
        </p>

        <dl className="mt-6 grid grid-cols-1 border border-border text-sm sm:grid-cols-2">
          <div className="border-b border-border p-3 sm:border-r">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              Location
            </dt>
            <dd className="mt-1 font-semibold">
              {job.locations.join(", ") || "India"}
            </dd>
          </div>
          <div className="border-b border-border p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              Experience
            </dt>
            <dd className="mt-1 font-semibold">{experienceLabel(job)}</dd>
          </div>
          <div className="border-b border-border p-3 sm:border-b-0 sm:border-r">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              Work mode
            </dt>
            <dd className="mt-1 font-semibold">
              {job.isRemote ? "Remote eligible" : "Office / hybrid"}
            </dd>
          </div>
          <div className="p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
              Verified
            </dt>
            <dd className="mt-1 font-semibold">
              {formatPostedDate(job.postedAt)}
            </dd>
          </div>
          {job.salary && (
            <div className="border-t border-border p-3 sm:col-span-2">
              <dt className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
                Compensation
              </dt>
              <dd className="mt-1 font-semibold">{job.salary}</dd>
            </div>
          )}
        </dl>

        {job.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {job.tags
              .filter(Boolean)
              .slice(0, 8)
              .map((tag) => (
                <span
                  key={tag}
                  className="border border-border bg-muted px-2 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}

        <div className="mt-7">
          <h3 className="text-xs font-black uppercase tracking-[0.18em]">
            Role overview
          </h3>
          <p
            className={`mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground ${
              mobile
                ? ""
                : "max-h-56 overflow-y-auto overscroll-contain border-y border-border py-3 pr-3"
            }`}
          >
            {job.description ||
              "Open the official application page to review the complete role description and eligibility criteria."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_auto] gap-2">
          {job.applicationUrl ? (
            <Button asChild size="lg" className="w-full">
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply on company site
                <ExternalLink className="ml-2" size={16} aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <Button size="lg" disabled>
              Application unavailable
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={shareJob}
            aria-label="Share job"
          >
            <Share2 size={17} aria-hidden="true" />
          </Button>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Applications open on the employer&apos;s official careers page. JNTUH
          Connect never asks for payment or application credentials.
        </p>
      </div>
    </aside>
  );
}

export default function JobBoard() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<JobType | "">("");
  const [companyType, setCompanyType] = useState<CompanyType | "">("");
  const [remote, setRemote] = useState<"" | "true" | "false">("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError("");

    getJobs(
      {
        page,
        pageSize: PAGE_SIZE,
        keyword: keyword || undefined,
        type: type || undefined,
        companyType: companyType || undefined,
        remote: remote === "" ? undefined : remote === "true",
      },
      controller.signal,
    )
      .then((response) => {
        setJobs((current) => {
          if (page === 1) return response.jobs;
          const knownIds = new Set(current.map((job) => job.id));
          return [
            ...current,
            ...response.jobs.filter((job) => !knownIds.has(job.id)),
          ];
        });
        setHasMore(response.hasMore);
        if (page === 1) setSelectedId(response.jobs[0]?.id ?? null);
      })
      .catch((requestError) => {
        if (requestError?.code !== "ERR_CANCELED") {
          setError(
            "We could not load opportunities right now. Please try again.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [page, keyword, type, companyType, remote, refreshNonce]);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedId) || jobs[0] || null,
    [jobs, selectedId],
  );

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setPage(1);
    setKeyword(keywordInput.trim());
  };

  const resetFilters = () => {
    setKeywordInput("");
    setKeyword("");
    setType("");
    setCompanyType("");
    setRemote("");
    setPage(1);
    setMobileDetailOpen(false);
  };

  const selectJob = (jobId: string) => {
    setSelectedId(jobId);
    if (window.matchMedia("(max-width: 1279px)").matches) {
      setMobileDetailOpen(true);
    }
  };

  const hasFilters = Boolean(keyword || type || companyType || remote);

  return (
    <div className="min-h-[calc(100dvh-4rem)] pb-5">
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-xs font-black uppercase tracking-[0.16em]">
                <Sparkles size={14} aria-hidden="true" />
                Updated every 24 hours
              </div>
              <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Engineering opportunities for your first big break.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                India-eligible internships and fresher roles, checked against
                official career pages and filtered for early-career engineers.
              </p>
            </div>
            <div className="grid grid-cols-2 border border-border bg-background text-center">
              <div className="border-r border-border px-5 py-4">
                <div className="text-2xl font-black">60+</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Companies tracked
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="text-2xl font-black">24h</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Refresh cycle
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="border border-border bg-card">
          <div className="document-band">Find your opportunity</div>
          <div className="grid items-end gap-3 p-4 sm:grid-cols-2 xl:grid-cols-[minmax(320px,1.5fr)_minmax(150px,0.72fr)_minmax(150px,0.72fr)_minmax(150px,0.72fr)_auto]">
            <form
              onSubmit={submitSearch}
              className="grid min-w-0 gap-1 sm:col-span-2 xl:col-span-1"
            >
              <label
                htmlFor="job-search"
                className="text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground"
              >
                Search jobs by title, company, or skill
              </label>
              <div className="flex min-w-0">
                <Input
                  id="job-search"
                  value={keywordInput}
                  onChange={(event) => setKeywordInput(event.target.value)}
                  placeholder="Role, company, or skill"
                  className="h-12 min-w-0 border-r-0"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 shrink-0"
                >
                  <Search size={17} aria-hidden="true" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </form>

            <label className="grid gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
              Opportunity
              <select
                value={type}
                onChange={(event) => {
                  setType(event.target.value as JobType | "");
                  setPage(1);
                }}
                className="h-12 w-full border border-input bg-background px-3 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-foreground"
              >
                <option value="">All roles</option>
                <option value="INTERN">Internships</option>
                <option value="FULL_TIME">Full time</option>
                <option value="PART_TIME">Part time</option>
              </select>
            </label>

            <label className="grid gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
              Company
              <select
                value={companyType}
                onChange={(event) => {
                  setCompanyType(event.target.value as CompanyType | "");
                  setPage(1);
                }}
                className="h-12 w-full border border-input bg-background px-3 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-foreground"
              >
                <option value="">All companies</option>
                <option value="PRODUCT">Product based</option>
                <option value="SERVICE">Service based</option>
                <option value="OTHER">Other</option>
              </select>
            </label>

            <label className="grid gap-1 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
              Work mode
              <select
                value={remote}
                onChange={(event) => {
                  setRemote(event.target.value as "" | "true" | "false");
                  setPage(1);
                }}
                className="h-12 w-full border border-input bg-background px-3 text-sm font-semibold normal-case tracking-normal text-foreground outline-none focus:border-foreground"
              >
                <option value="">Any mode</option>
                <option value="true">Remote eligible</option>
                <option value="false">Office / hybrid</option>
              </select>
            </label>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full self-end sm:col-span-2 xl:col-span-1 xl:w-auto"
              onClick={resetFilters}
              disabled={!hasFilters && !keywordInput}
            >
              <RefreshCcw className="mr-2" size={15} aria-hidden="true" />
              Reset
            </Button>
          </div>
        </section>

        <section className="mt-6 xl:sticky xl:top-16 xl:flex xl:h-[calc(100dvh-4rem)] xl:flex-col xl:overflow-hidden xl:bg-background">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border bg-background pb-3 xl:pt-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Briefcase size={17} aria-hidden="true" />
              {isLoading && page === 1
                ? "Checking current openings…"
                : `${jobs.length} ${jobs.length === 1 ? "opportunity" : "opportunities"} available`}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <PackageCheck size={15} aria-hidden="true" />
              Direct employer application links
            </div>
          </div>

          {error ? (
            <div className="mt-6 border border-destructive bg-card p-8 text-center">
              <p className="font-bold">{error}</p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setPage(1);
                  setRefreshNonce((current) => current + 1);
                }}
              >
                Try again
              </Button>
            </div>
          ) : isLoading && page === 1 ? (
            <div className="mt-6 grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] xl:grid-rows-[minmax(0,1fr)]">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-48 animate-pulse border border-border bg-muted"
                  />
                ))}
              </div>
              <div className="hidden h-[620px] animate-pulse border border-border bg-muted xl:block" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="mt-6 border border-border bg-card px-6 py-16 text-center">
              <GraduationCap className="mx-auto" size={34} aria-hidden="true" />
              <h2 className="mt-4 text-xl font-black">
                No matching openings today
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Try a broader filter. The board refreshes daily as companies
                publish new internships and graduate roles.
              </p>
              <Button className="mt-5" variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 xl:mt-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)] xl:grid-rows-[minmax(0,1fr)] xl:items-stretch">
              <div className="space-y-4 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:pb-6 xl:pr-2">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    selected={job.id === selectedJob?.id}
                    onSelect={() => selectJob(job.id)}
                  />
                ))}
                {hasMore && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 w-full"
                    onClick={() => setPage((current) => current + 1)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading more…" : "Load more opportunities"}
                  </Button>
                )}
              </div>
              {selectedJob && (
                <div className="hidden xl:min-h-0 xl:overflow-hidden xl:block">
                  <JobDetail job={selectedJob} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      <Dialog open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
        <DialogContent className="bottom-0 left-0 top-auto h-[92dvh] w-full max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto border-x-0 border-b-0 bg-card p-0 sm:left-1/2 sm:w-[calc(100%_-_2rem)] sm:max-w-[680px] sm:translate-x-[-50%] sm:border xl:hidden">
          <DialogTitle className="sr-only">
            {selectedJob
              ? `${selectedJob.title} at ${selectedJob.companyCanonical || selectedJob.company}`
              : "Job details"}
          </DialogTitle>
          {selectedJob && <JobDetail job={selectedJob} mobile />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
