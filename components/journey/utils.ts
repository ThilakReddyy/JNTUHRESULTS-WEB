export const GRADE_POINTS: Record<string, number> = {
  O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5,
  F: 0, AB: 0, ABS: 0, "-": 0, P: 0,
};

export function gradeToPoints(grade: string): number {
  return GRADE_POINTS[grade?.toUpperCase() ?? ""] ?? 0;
}

export function isFailGrade(grade: string): boolean {
  const g = grade?.toUpperCase() ?? "";
  return g === "F" || g === "AB" || g === "ABS" || g === "-";
}

export function computeSimulatedCGPA(
  semesters: any[],
  overrides: Record<string, string>
): string {
  let totalPoints = 0;
  let totalCredits = 0;
  for (const sem of semesters) {
    for (const sub of sem.subjects ?? []) {
      const credits = Number(sub.credits) || 0;
      const grade = overrides[sub.subjectCode] ?? sub.grades;
      totalPoints += gradeToPoints(grade) * credits;
      totalCredits += credits;
    }
  }
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
}

export type Archetype = {
  title: string;
  tagline: string;
  gradient: string;
  emoji: string;
};

export function computeArchetype(
  cgpa: number,
  backlogs: number,
  sgpas: number[],
  hadComebacks: boolean
): Archetype {
  const n = sgpas.length;
  const isRising =
    n >= 3 && sgpas[n - 1] > sgpas[n - 2] && sgpas[n - 2] > sgpas[n - 3];

  if (cgpa >= 8.5 && backlogs === 0)
    return {
      title: "The Scholar",
      tagline: "Excellence woven into every chapter.",
      gradient: "from-amber-400 to-yellow-500",
      emoji: "🏆",
    };
  if (hadComebacks && backlogs === 0)
    return {
      title: "The Phoenix",
      tagline: "Rose from the ashes. Every single battle, won.",
      gradient: "from-orange-500 to-red-600",
      emoji: "🔥",
    };
  if (isRising)
    return {
      title: "The Rising Star",
      tagline: "Getting better each semester. Your best chapter is still unwritten.",
      gradient: "from-blue-500 to-violet-600",
      emoji: "⭐",
    };
  if (cgpa >= 7.5 && backlogs === 0)
    return {
      title: "The Consistent One",
      tagline: "Steady, reliable, delivered every single semester.",
      gradient: "from-green-500 to-emerald-600",
      emoji: "🎯",
    };
  if (backlogs > 0)
    return {
      title: "The Warrior",
      tagline: "Still fighting. The strongest stories have the most plot twists.",
      gradient: "from-red-500 to-rose-700",
      emoji: "⚔️",
    };
  return {
    title: "The Survivor",
    tagline: "Every semester survived is proof you belong here.",
    gradient: "from-purple-500 to-violet-700",
    emoji: "💪",
  };
}

export type Badge = {
  id: string;
  title: string;
  desc: string;
  emoji: string;
};

export function computeBadges(
  semesters: any[],
  allSemesters: any[] | null,
  cgpa: number,
  backlogs: number
): Badge[] {
  const badges: Badge[] = [];
  const sgpas = semesters
    .filter((s) => s.semesterSGPA && parseFloat(s.semesterSGPA) > 0)
    .map((s) => parseFloat(s.semesterSGPA));

  if (cgpa >= 9.0)
    badges.push({ id: "legend", title: "Legend", desc: "CGPA ≥ 9.0 — extraordinary", emoji: "💎" });
  else if (cgpa >= 8.5)
    badges.push({ id: "scholar", title: "Scholar", desc: "CGPA ≥ 8.5 — top tier", emoji: "🏆" });

  if (backlogs === 0)
    badges.push({ id: "clean-slate", title: "Clean Slate", desc: "Zero active backlogs", emoji: "✅" });

  if (sgpas.some((s) => s >= 9.0))
    badges.push({ id: "perfectionist", title: "Perfectionist", desc: "SGPA ≥ 9.0 in a semester", emoji: "⚡" });

  let maxRising = 0, cur = 0;
  for (let i = 1; i < sgpas.length; i++) {
    if (sgpas[i] > sgpas[i - 1]) { cur++; maxRising = Math.max(maxRising, cur); }
    else cur = 0;
  }
  if (maxRising >= 2)
    badges.push({ id: "rising", title: "Rising Star", desc: `${maxRising + 1} consecutive semesters of growth`, emoji: "⭐" });

  if (sgpas.length >= 2 && sgpas.every((s) => s >= 7.0))
    badges.push({ id: "consistent", title: "Consistent", desc: "Every semester SGPA above 7.0", emoji: "🎯" });

  if (allSemesters) {
    let hadSupplementary = false;
    let clearedCount = 0;

    for (const sem of allSemesters) {
      const exams = sem.exams ?? [];
      if (exams.length <= 1) continue;

      hadSupplementary = true;

      const subjectHistory: Record<string, string[]> = {};
      for (const exam of exams) {
        for (const sub of exam.subjects ?? []) {
          if (!subjectHistory[sub.subjectCode]) subjectHistory[sub.subjectCode] = [];
          subjectHistory[sub.subjectCode].push(sub.grades);
        }
      }

      for (const grades of Object.values(subjectHistory)) {
        if (grades.length >= 2) {
          let wasFailed = false;
          for (const g of grades) {
            if (isFailGrade(g)) wasFailed = true;
            else if (wasFailed) clearedCount++;
          }
        }
      }
    }

    if (hadSupplementary)
      badges.push({ id: "battle-tested", title: "Battle Tested", desc: "Fought through supplementary exams", emoji: "⚔️" });
    if (clearedCount >= 2)
      badges.push({ id: "comeback", title: "Comeback Kid", desc: `${clearedCount} subjects rescued from failure`, emoji: "🔥" });
  }

  return badges;
}

const SEM_LABELS: Record<string, string> = {
  "1-1": "Year 1 · Sem 1", "1-2": "Year 1 · Sem 2",
  "2-1": "Year 2 · Sem 1", "2-2": "Year 2 · Sem 2",
  "3-1": "Year 3 · Sem 1", "3-2": "Year 3 · Sem 2",
  "4-1": "Year 4 · Sem 1", "4-2": "Year 4 · Sem 2",
};

export function getSemLabel(sem: string): string {
  return SEM_LABELS[sem] ?? sem;
}

export function getSemNarrative(
  sgpa: number,
  prev: number | null,
  backlogs: number,
  isFirst: boolean
): string {
  if (isFirst) {
    if (sgpa >= 8.5) return "A legendary opening chapter. You set the bar high.";
    if (sgpa >= 7.0) return "A solid start. You found your footing early on.";
    return "A tough beginning — but every great story starts somewhere.";
  }
  if (prev !== null) {
    const d = sgpa - prev;
    if (d >= 1.5) return "The breakthrough. Something clicked this semester.";
    if (d >= 0.5) return "You improved. The upward trend is real.";
    if (d <= -1.5) return "A heavy semester. What doesn't break you, builds you.";
    if (d <= -0.5) return "A dip, but not a fall. You kept moving forward.";
  }
  if (backlogs === 0 && sgpa >= 8.0) return "Outstanding. Flawless execution this semester.";
  if (backlogs === 0) return "Clean run. No excuses, no regrets.";
  if (backlogs > 2) return "Heavy load this semester. The comeback will be sweeter.";
  return "A close fight. You're almost there.";
}
