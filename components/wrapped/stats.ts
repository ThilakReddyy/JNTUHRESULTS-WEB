import { computeArchetype, isFailGrade, type Archetype } from "@/components/journey/utils";

export interface WrappedStats {
  name: string;
  rollNumber: string;
  semestersCompleted: number;
  totalSubjectsStudied: number;
  creditsEarned: number;
  totalExamAppearances: number;
  supplementaryCount: number;
  bestSemester: { semester: string; sgpa: number };
  toughestSemester: { semester: string; sgpa: number } | null;
  hardestSubject: {
    name: string;
    story: "comeback" | "lowest" | "backlog";
    extraInfo: string;
  } | null;
  gradeFrequency: { grade: string; count: number; color: string }[];
  mostFrequentGrade: string;
  backlogs: number;
  archetype: Archetype;
  hadComebacks: boolean;
  totalMarksScored: number;
  totalMaxMarks: number;
  uniqueExamCodes: number;
}

const GRADE_COLORS: Record<string, string> = {
  O: "#10b981", "A+": "#3b82f6", A: "#06b6d4",
  "B+": "#8b5cf6", B: "#a855f7", C: "#f59e0b",
  F: "#ef4444", AB: "#f87171", ABS: "#f87171",
};

const GRADE_ORDER = ["O", "A+", "A", "B+", "B", "C", "F", "AB"];

export function computeWrappedStats(
  academicData: AcademicResulProps,
  allData: any
): WrappedStats {
  const { details, results } = academicData;
  const semesters: any[] = results.semesters ?? [];
  const allSemesters: any[] = allData?.results ?? [];

  // Semesters completed
  const completedSems = semesters.filter(
    (s) => s.semesterSGPA && parseFloat(s.semesterSGPA) > 0
  );
  const sgpas = completedSems.map((s) => parseFloat(s.semesterSGPA));

  // All subjects from best-attempt
  const allSubjects: any[] = [];
  for (const sem of semesters) {
    for (const sub of sem.subjects ?? []) {
      allSubjects.push({ ...sub, semester: sem.semester });
    }
  }

  // Credits earned
  const creditsEarned = Number(results.credits || 0);

  // Exam appearances from allResult
  let totalExamAppearances = 0;
  let supplementaryCount = 0;
  let uniqueExamCodes = new Set<string>();
  let comebackSubjects: { name: string; semester: string }[] = [];

  for (const sem of allSemesters) {
    const exams = sem.exams ?? [];
    totalExamAppearances += exams.length;
    for (const exam of exams) {
      if (exam.examCode) uniqueExamCodes.add(exam.examCode);
    }
    if (exams.length > 1) {
      supplementaryCount += exams.length - 1;
      // Find comebacks
      const subHistory: Record<string, string[]> = {};
      for (const exam of exams) {
        for (const sub of exam.subjects ?? []) {
          if (!subHistory[sub.subjectCode]) subHistory[sub.subjectCode] = [];
          subHistory[sub.subjectCode].push(sub.grades);
        }
      }
      for (const [, grades] of Object.entries(subHistory)) {
        let wasFailed = false;
        for (const g of grades) {
          if (isFailGrade(g)) wasFailed = true;
          else if (wasFailed) {
            const subName = allSubjects.find(
              (s) => s.subjectCode === Object.keys(subHistory)[0]
            )?.subjectName ?? "a subject";
            comebackSubjects.push({ name: subName, semester: sem.semester });
            break;
          }
        }
      }
    }
  }

  // Best and toughest semester
  let bestSem = completedSems[0];
  let toughestSem = completedSems[0];
  for (const sem of completedSems) {
    const sgpa = parseFloat(sem.semesterSGPA);
    if (sgpa > parseFloat(bestSem?.semesterSGPA ?? "0")) bestSem = sem;
    if (sgpa < parseFloat(toughestSem?.semesterSGPA ?? "99")) toughestSem = sem;
  }

  // Hardest subject
  let hardestSubject: WrappedStats["hardestSubject"] = null;
  if (comebackSubjects.length > 0) {
    // Find a subject name from comebacks - search allSemesters for the subject
    let comebackName = "a subject";
    outer: for (const sem of allSemesters) {
      const exams = sem.exams ?? [];
      if (exams.length > 1) {
        const subHistory: Record<string, { name: string; grades: string[] }> = {};
        for (const exam of exams) {
          for (const sub of exam.subjects ?? []) {
            if (!subHistory[sub.subjectCode]) {
              subHistory[sub.subjectCode] = { name: sub.subjectName ?? sub.subjectCode, grades: [] };
            }
            subHistory[sub.subjectCode].grades.push(sub.grades);
          }
        }
        for (const [, val] of Object.entries(subHistory)) {
          let wasFailed = false;
          for (const g of val.grades) {
            if (isFailGrade(g)) wasFailed = true;
            else if (wasFailed) { comebackName = val.name; break outer; }
          }
        }
      }
    }
    hardestSubject = {
      name: comebackName,
      story: "comeback",
      extraInfo: `Cleared after failing`,
    };
  } else {
    // Find subject with lowest total marks (excluding Ab)
    const gradedSubs = allSubjects.filter(
      (s) => !isFailGrade(s.grades) && Number(s.totalMarks) > 0
    );
    if (gradedSubs.length > 0) {
      const lowest = gradedSubs.reduce((a, b) =>
        Number(a.totalMarks) < Number(b.totalMarks) ? a : b
      );
      hardestSubject = {
        name: lowest.subjectName ?? lowest.subjectCode,
        story: "lowest",
        extraInfo: `${lowest.totalMarks} marks · Grade ${lowest.grades}`,
      };
    }
    // If there are backlogs, pick one
    const backlogSub = allSubjects.find((s) => isFailGrade(s.grades));
    if (backlogSub) {
      hardestSubject = {
        name: backlogSub.subjectName ?? backlogSub.subjectCode,
        story: "backlog",
        extraInfo: "Still undefeated. Your unfinished business.",
      };
    }
  }

  // Grade frequency
  const gradeCount: Record<string, number> = {};
  for (const sub of allSubjects) {
    const g = sub.grades?.toUpperCase() ?? "";
    if (!g) continue;
    const key = g === "ABS" ? "AB" : g;
    gradeCount[key] = (gradeCount[key] || 0) + 1;
  }
  const gradeFrequency = GRADE_ORDER.filter((g) => gradeCount[g] > 0).map(
    (g) => ({ grade: g, count: gradeCount[g], color: GRADE_COLORS[g] ?? "#9ca3af" })
  );
  const mostFrequentGrade = gradeFrequency.sort((a, b) => b.count - a.count)[0]?.grade ?? "—";
  gradeFrequency.sort(
    (a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade)
  );

  // Total marks
  const totalMarksScored = allSubjects.reduce((sum, s) => sum + (Number(s.totalMarks) || 0), 0);
  const totalMaxMarks = allSubjects.length * 100;

  // Archetype
  const hadComebacks = comebackSubjects.length > 0;
  const archetype = computeArchetype(
    parseFloat(results.CGPA || "0"),
    Number(results.backlogs || 0),
    sgpas,
    hadComebacks
  );

  return {
    name: details.name ?? "Student",
    rollNumber: details.rollNumber ?? "",
    semestersCompleted: completedSems.length,
    totalSubjectsStudied: allSubjects.length,
    creditsEarned,
    totalExamAppearances,
    supplementaryCount,
    bestSemester: {
      semester: bestSem?.semester ?? "—",
      sgpa: parseFloat(bestSem?.semesterSGPA ?? "0"),
    },
    toughestSemester:
      toughestSem && toughestSem.semester !== bestSem?.semester
        ? { semester: toughestSem.semester, sgpa: parseFloat(toughestSem.semesterSGPA) }
        : null,
    hardestSubject,
    gradeFrequency,
    mostFrequentGrade,
    backlogs: Number(results.backlogs || 0),
    archetype,
    hadComebacks,
    totalMarksScored,
    totalMaxMarks,
    uniqueExamCodes: uniqueExamCodes.size,
  };
}
