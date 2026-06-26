"use client";

import { useState, useMemo } from "react";
import { isFailGrade, computeSimulatedCGPA, gradeToPoints } from "./utils";

interface CGPASimulatorProps {
  semesters: any[];
  currentCGPA: string;
}

const TARGET_GRADES = [
  { label: "C  (5 pts)", value: "C" },
  { label: "B  (6 pts)", value: "B" },
  { label: "B+ (7 pts)", value: "B+" },
  { label: "A  (8 pts)", value: "A" },
  { label: "A+ (9 pts)", value: "A+" },
  { label: "O  (10 pts)", value: "O" },
];

const CGPASimulator = ({ semesters, currentCGPA }: CGPASimulatorProps) => {
  const backlogs = useMemo(() => {
    const list: Array<{
      subjectCode: string;
      subjectName: string;
      credits: number;
      semester: string;
    }> = [];
    for (const sem of semesters) {
      for (const sub of sem.subjects ?? []) {
        if (isFailGrade(sub.grades)) {
          list.push({
            subjectCode: sub.subjectCode,
            subjectName: sub.subjectName,
            credits: Number(sub.credits) || 0,
            semester: sem.semester,
          });
        }
      }
    }
    return list;
  }, [semesters]);

  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const simCGPA = useMemo(
    () => computeSimulatedCGPA(semesters, overrides),
    [semesters, overrides]
  );

  if (backlogs.length === 0) return null;

  const current = parseFloat(currentCGPA || "0");
  const simVal = parseFloat(simCGPA);
  const delta = simVal - current;

  const clearAll = () => {
    const all: Record<string, string> = {};
    for (const b of backlogs) all[b.subjectCode] = "A";
    setOverrides(all);
  };

  const reset = () => setOverrides({});

  const setGrade = (code: string, val: string) => {
    if (!val) {
      const next = { ...overrides };
      delete next[code];
      setOverrides(next);
    } else {
      setOverrides((prev) => ({ ...prev, [code]: val }));
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm mb-6 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            CGPA Dream Simulator
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors font-medium"
          >
            Clear all (A grade)
          </button>
          <button
            onClick={reset}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          Pick a target grade for each backlog and see your CGPA update in real time.
          This is what{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-300">could be</span>.
        </p>

        <div className="flex items-center justify-center gap-8 py-5 mb-5 bg-gray-50 dark:bg-white/5 rounded-2xl">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">Current</p>
            <p className="text-4xl font-bold text-gray-700 dark:text-gray-200 tabular-nums">
              {currentCGPA}
            </p>
          </div>
          <div className="text-gray-300 dark:text-gray-600 text-xl font-light">→</div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">Potential</p>
            <p
              className={`text-4xl font-bold tabular-nums transition-colors ${
                delta > 0.005 ? "text-emerald-500" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {simCGPA}
            </p>
            {delta > 0.005 && (
              <p className="text-xs text-emerald-500 font-bold mt-1">
                +{delta.toFixed(2)} uplift
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {backlogs.map((b) => (
            <div
              key={b.subjectCode}
              className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-white/5 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                  {b.subjectName}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {b.semester} · {b.credits} cr
                </p>
              </div>
              <select
                value={overrides[b.subjectCode] || ""}
                onChange={(e) => setGrade(b.subjectCode, e.target.value)}
                className="text-xs border border-gray-200 dark:border-white/20 rounded-lg px-2 py-1.5 bg-white dark:bg-white/10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
              >
                <option value="">F (current)</option>
                {TARGET_GRADES.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CGPASimulator;
