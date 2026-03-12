"use client";

import { rcrvdetails } from "@/constants/rcrvdetails";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import ExamResults from "../examresults/examresults";
import { romanToNumeral } from "@/constants/romantoNumeral";
import Head from "next/head";
import { Clock, User, ExternalLink, Calendar } from "lucide-react";

const NotificationExamCode = ({
  link,
  title,
  date,
  formatted_date,
}: {
  link: string;
  title: string;
  date: string;
  formatted_date: string;
}) => {
  const [resultnew, setResultnew] = useState(false);
  const [rcrvdate, setRcrvdate] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");

  if (title === null) redirect("/notifications");

  const rcrv = title.includes("RC");

  useEffect(() => {
    let dt = title;
    for (let key in romanToNumeral) {
      const regex = new RegExp(key, "g");
      dt = dt.replace(regex, romanToNumeral[key].toString());
    }
    setDocumentTitle("JNTUH " + dt);
    document.title = "JNTUH " + dt;

    if (formatted_date !== null) {
      const rcrvdate = rcrvdetails[formatted_date as keyof typeof rcrvdetails];
      if (rcrvdate !== undefined) {
        setRcrvdate(rcrvdate);
        const parts = rcrvdate.split("-");
        const compareDate = new Date(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0]),
        );
        setResultnew(compareDate > new Date());
      }
    }
  }, [formatted_date, title]);

  const directLinks = [
    {
      label: "Mirror Link",
      href: `http://202.63.105.184/results/jsp/SearchResult.jsp?${link.split("?")[1]}`,
    },
    { label: "JNTUH Official", href: link },
  ];

  return (
    <>
      <Head>
        <meta name="description" content={documentTitle} />
      </Head>

      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Title block */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-2">
            {resultnew && (
              <span className="flex-shrink-0 mt-1 text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                New
              </span>
            )}
            <h1 className="font-bold text-lg sm:text-2xl text-gray-800 dark:text-gray-100 leading-snug">
              {title}
            </h1>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <User size={12} /> JNTUH Vercel
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> Last Updated: {date}
            </span>
          </div>
        </div>

        {/* Direct links card */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm mb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0b3954]">
            <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Direct Links
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {directLinks.map((l, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-white dark:bg-white/5"
              >
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {l.label}
                </span>
                <Link
                  href={l.href}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
                >
                  Open <ExternalLink size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Exam results */}
        <ExamResults title={title} query={link} />

        {/* Footer info */}
        <div className="mt-6 flex flex-col gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> Published: {date}
          </span>
          {rcrvdate && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Clock size={12} />
              {rcrv
                ? `Last date for Challenge Valuation: ${rcrvdate}`
                : `Last date for Revaluation/Recounting: ${rcrvdate}`}
            </span>
          )}
          <p className="mt-2 text-justify leading-relaxed">
            <span className="font-semibold text-gray-500 dark:text-gray-400">
              Note:{" "}
            </span>
            As per prevailing practice since 2012, if difference of marks after
            revaluation and first valuation is more than or equal to 15% of
            maximum external marks then revaluation marks will be retained. If
            the change is less than 15% or marks secured in revaluation is less
            than first valuation marks, the first valuation marks shall be
            retained.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotificationExamCode;
