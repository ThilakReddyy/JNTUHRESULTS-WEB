"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { computeWrappedStats, type WrappedStats } from "@/components/wrapped/stats";

/* ─── helpers ─────────────────────────────────────────────────────────── */

const SEM_MAP: Record<string, string> = {
  "1-1": "Year 1, Sem 1", "1-2": "Year 1, Sem 2",
  "2-1": "Year 2, Sem 1", "2-2": "Year 2, Sem 2",
  "3-1": "Year 3, Sem 1", "3-2": "Year 3, Sem 2",
  "4-1": "Year 4, Sem 1", "4-2": "Year 4, Sem 2",
};
const semLabel = (s: string) => SEM_MAP[s] ?? s;

/* ─── card definitions ────────────────────────────────────────────────── */

interface Card {
  id: string;
  bg: string;
  render: (s: WrappedStats) => React.ReactNode;
}

const cards: Card[] = [
  {
    id: "intro",
    bg: "from-[#0b3954] via-[#1a1a4e] to-[#0d0d2b]",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-white/50 text-sm tracking-[0.3em] uppercase">JNTUH</p>
        <p className="text-5xl font-black tracking-tight text-white leading-none">
          Academic<br />Wrapped
        </p>
        <div className="w-16 h-0.5 bg-white/30 rounded" />
        <p className="text-2xl font-bold text-white/90">{s.name.split(" ")[0]}</p>
        <p className="text-white/50 text-sm font-mono">{s.rollNumber}</p>
        <p className="text-white/30 text-xs mt-8 animate-pulse">Tap to begin →</p>
      </div>
    ),
  },
  {
    id: "semesters",
    bg: "from-indigo-900 via-purple-900 to-indigo-800",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase">The Journey</p>
        <p className="text-[7rem] font-black leading-none text-white tabular-nums">
          {s.semestersCompleted}
        </p>
        <p className="text-2xl font-bold text-white/90 leading-snug">
          semester{s.semestersCompleted !== 1 ? "s" : ""}.<br />Countless nights.
        </p>
        <p className="text-white/60 text-base mt-2">
          That&apos;s approximately{" "}
          <span className="text-white font-bold">
            {Math.round(s.semestersCompleted * 6)} months
          </span>{" "}
          of your life dedicated to this.
        </p>
      </div>
    ),
  },
  {
    id: "subjects",
    bg: "from-blue-900 via-cyan-900 to-teal-900",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase">The Battlefield</p>
        <p className="text-[6rem] font-black leading-none text-white tabular-nums">
          {s.totalSubjectsStudied}
        </p>
        <p className="text-2xl font-bold text-white/90">
          subjects stood<br />between you and graduation.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 rounded-2xl px-6 py-3">
            <p className="text-2xl font-bold text-white">{s.creditsEarned}</p>
            <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Credits Earned</p>
          </div>
          <div className="bg-white/10 rounded-2xl px-6 py-3">
            <p className="text-2xl font-bold text-white">{s.totalExamAppearances}</p>
            <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Exam Sittings</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "hardest",
    bg: "from-red-950 via-rose-900 to-red-900",
    render: (s) => {
      if (!s.hardestSubject) return (
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-5xl">🛡️</p>
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Clean Run</p>
          <p className="text-3xl font-black text-white leading-snug">
            You never let a subject hold you back.
          </p>
          <p className="text-white/60 text-base">Every single exam, cleared on the first try.</p>
        </div>
      );
      const icons = { comeback: "🔥", lowest: "⚔️", backlog: "🎯" };
      const stories = {
        comeback: "You failed it. Then you came back and destroyed it.",
        lowest: "Your toughest opponent by points.",
        backlog: "Your unfinished business. Your next victory.",
      };
      return (
        <div className="flex flex-col items-center text-center gap-5 max-w-xs">
          <p className="text-5xl">{icons[s.hardestSubject.story]}</p>
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Your Hardest Battle</p>
          <p className="text-2xl font-black text-white leading-snug">
            {s.hardestSubject.name}
          </p>
          <p className="text-white/70 text-base">{stories[s.hardestSubject.story]}</p>
          <p className="text-white/40 text-xs">{s.hardestSubject.extraInfo}</p>
        </div>
      );
    },
  },
  {
    id: "peak",
    bg: "from-amber-600 via-yellow-700 to-orange-700",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-5xl">🏆</p>
        <p className="text-white/70 text-xs tracking-[0.3em] uppercase">Your Peak</p>
        <p className="text-[5.5rem] font-black leading-none text-white tabular-nums">
          {s.bestSemester.sgpa.toFixed(2)}
        </p>
        <p className="text-xl font-bold text-white/90">SGPA</p>
        <p className="text-white/70 text-base mt-1">
          in {semLabel(s.bestSemester.semester)}
        </p>
        <div className="mt-3 bg-white/15 rounded-2xl px-6 py-3 text-center">
          <p className="text-white/80 text-sm">
            {s.bestSemester.sgpa >= 9
              ? "Borderline perfect. That semester, you were unstoppable."
              : s.bestSemester.sgpa >= 8
              ? "That semester, you showed everyone what you're made of."
              : s.bestSemester.sgpa >= 7
              ? "A strong chapter in your story."
              : "Every chapter has a best page. This was yours."}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "grades",
    bg: "from-slate-900 via-slate-800 to-zinc-900",
    render: (s) => {
      const total = s.gradeFrequency.reduce((a, b) => a + b.count, 0);
      return (
        <div className="flex flex-col gap-5 w-full max-w-xs">
          <div className="text-center">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-1">Your Grade DNA</p>
            <p className="text-white/80 text-sm">
              Your most-scored grade:{" "}
              <span className="font-bold text-white">{s.mostFrequentGrade}</span>
            </p>
          </div>
          <div className="space-y-2.5">
            {s.gradeFrequency.map(({ grade, count, color }) => (
              <div key={grade} className="flex items-center gap-3">
                <p className="text-white/70 text-xs font-mono w-6 text-right shrink-0">{grade}</p>
                <div className="flex-1 h-5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(count / total) * 100}%`, backgroundColor: color }}
                  />
                </div>
                <p className="text-white/50 text-xs w-5 shrink-0">{count}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: "archetype",
    bg: "from-violet-900 via-purple-900 to-fuchsia-900",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-5">
        <p className="text-white/50 text-xs tracking-[0.3em] uppercase">You Are</p>
        <p className="text-7xl">{s.archetype.emoji}</p>
        <p className="text-3xl font-black text-white">{s.archetype.title}</p>
        <p className="text-white/70 text-base leading-relaxed max-w-[260px]">
          {s.archetype.tagline}
        </p>
        {s.supplementaryCount > 0 && (
          <div className="bg-white/10 rounded-2xl px-5 py-3 mt-2 text-center">
            <p className="text-white/60 text-sm">
              You fought{" "}
              <span className="text-white font-bold">{s.supplementaryCount}</span>{" "}
              supplementary exam{s.supplementaryCount > 1 ? "s" : ""}.{" "}
              {s.hadComebacks ? "And won." : "That takes guts."}
            </p>
          </div>
        )}
      </div>
    ),
  },
  {
    id: "numbers",
    bg: "from-emerald-900 via-teal-900 to-green-900",
    render: (s) => {
      const scorePct = s.totalMaxMarks > 0
        ? Math.round((s.totalMarksScored / s.totalMaxMarks) * 100)
        : 0;
      return (
        <div className="flex flex-col items-center text-center gap-5 w-full max-w-xs">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">The Numbers</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { label: "Subjects Studied", val: s.totalSubjectsStudied },
              { label: "Credits Earned", val: s.creditsEarned },
              { label: "Exam Sittings", val: s.totalExamAppearances },
              { label: "Unique Exam Codes", val: s.uniqueExamCodes },
            ].map(({ label, val }) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-white">{val}</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-white/10 rounded-2xl p-4">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Score Rate</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${scorePct}%` }} />
            </div>
            <p className="text-white/70 text-xs mt-2">{scorePct}% of total marks scored</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "outro",
    bg: "from-[#0b3954] via-[#0d1b2a] to-[#0b3954]",
    render: (s) => (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="flex gap-1.5">
          {["✦", "✦", "✦"].map((star, i) => (
            <span key={i} className="text-white/30 text-lg">{star}</span>
          ))}
        </div>
        <p className="text-3xl font-black text-white leading-snug max-w-[280px]">
          Your story isn&apos;t<br />over yet.
        </p>
        <p className="text-white/60 text-base max-w-[260px] leading-relaxed">
          {s.backlogs > 0
            ? `${s.backlogs} chapter${s.backlogs > 1 ? "s" : ""} left unfinished. Go write the ending.`
            : "Every semester cleared. Keep writing legends."}
        </p>
        <div className="w-16 h-0.5 bg-white/20 rounded" />
        <p className="text-white/40 text-sm font-medium">{s.name}</p>
        <p className="text-white/20 text-xs font-mono">{s.rollNumber}</p>
        <p className="text-white/20 text-[10px] mt-4 tracking-widest uppercase">
          jntuhconnect.dhethi.com
        </p>
      </div>
    ),
  },
];

/* ─── main component ──────────────────────────────────────────────────── */

export default function WrappedResultPage() {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [stats, setStats] = useState<WrappedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!htno) { router.push("/wrapped"); return; }
    const base = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    const fetchData = async () => {
      toast.loading("Preparing your Wrapped...");
      try {
        const [acRes, allRes] = await Promise.allSettled([
          axios.get(`${base}api/getAcademicResult?rollNumber=${htno}`, { timeout: 20000, validateStatus: () => true }),
          axios.get(`${base}api/getAllResult?rollNumber=${htno}`, { timeout: 20000, validateStatus: () => true }),
        ]);
        toast.dismiss();
        const ac = acRes.status === "fulfilled" ? acRes.value : null;
        const all = allRes.status === "fulfilled" ? allRes.value : null;
        if (!ac || ac.status !== 200 || !("details" in (ac.data ?? {}))) {
          toast.error(ac?.status === 202 ? "Result is being prepared, check back shortly." : "Could not load your data.");
          router.push("/wrapped");
          return;
        }
        const allData = all?.status === 200 && "details" in (all.data ?? {}) ? all.data : null;
        setStats(computeWrappedStats(ac.data, allData));
      } catch {
        toast.dismiss();
        toast.error("Network error. Please try again.");
        router.push("/wrapped");
      }
      setLoading(false);
    };
    fetchData();
  }, [htno, router]);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => Math.max(0, Math.min(cards.length - 1, c + dir)));
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const x = e.clientX;
      if (x > window.innerWidth / 2) go(1);
      else go(-1);
    },
    [go]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  if (loading || !stats) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0b3954] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        <p className="text-white/50 text-sm tracking-widest uppercase">Building your story...</p>
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
      onClick={handleClick}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i < current ? "bg-white" : i === current ? "bg-white/80" : "bg-white/25"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${cards[current].bg} flex flex-col items-center justify-center px-8`}
        >
          {cards[current].render(stats)}
        </motion.div>
      </AnimatePresence>

      {/* Nav hints */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 pointer-events-none">
        <p className={`text-white/20 text-xs transition-opacity ${current > 0 ? "opacity-100" : "opacity-0"}`}>
          ← back
        </p>
        <p className={`text-white/20 text-xs transition-opacity ${current < cards.length - 1 ? "opacity-100" : "opacity-0"}`}>
          next →
        </p>
      </div>
    </div>
  );
}
