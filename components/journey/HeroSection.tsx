import { branchDetails } from "@/constants/branchdetails";
import { isFailGrade, computeArchetype, computeBadges, Badge } from "./utils";

interface HeroSectionProps {
  details: Record<string, any>;
  results: Record<string, any>;
  allSemesters: any[] | null;
}

const HeroSection = ({ details, results, allSemesters }: HeroSectionProps) => {
  const cgpa = parseFloat(results.CGPA || "0");
  const backlogs = Number(results.backlogs || 0);
  const semesters: any[] = results.semesters || [];
  const sgpas = semesters
    .filter((s) => s.semesterSGPA && parseFloat(s.semesterSGPA) > 0)
    .map((s) => parseFloat(s.semesterSGPA));

  let hadComebacks = false;
  if (allSemesters) {
    outer: for (const sem of allSemesters) {
      const subGrades: Record<string, string[]> = {};
      for (const exam of sem.exams ?? []) {
        for (const sub of exam.subjects ?? []) {
          if (!subGrades[sub.subjectCode]) subGrades[sub.subjectCode] = [];
          subGrades[sub.subjectCode].push(sub.grades);
        }
      }
      for (const grades of Object.values(subGrades)) {
        let wasFailed = false;
        for (const g of grades) {
          if (isFailGrade(g)) wasFailed = true;
          else if (wasFailed) { hadComebacks = true; break outer; }
        }
      }
    }
  }

  const archetype = computeArchetype(cgpa, backlogs, sgpas, hadComebacks);
  const badges = computeBadges(semesters, allSemesters, cgpa, backlogs);
  const branch = branchDetails[details.rollNumber?.substring(6, 8)] ?? "—";
  const completedSems = semesters.filter((s) => s.semesterSGPA && !s.failed).length;

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${archetype.gradient} p-6 text-white shadow-lg mb-6`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 font-semibold">
            Academic Battle Log
          </p>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{details.name}</h1>
          <p className="text-white/80 text-sm mt-1.5 font-mono">{details.rollNumber}</p>
          <p className="text-white/70 text-xs mt-0.5">{branch}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-4 text-center min-w-[160px]">
          <p className="text-3xl mb-1">{archetype.emoji}</p>
          <p className="font-bold text-base leading-tight">{archetype.title}</p>
          <p className="text-white/75 text-[11px] mt-1.5 leading-snug max-w-[150px]">
            {archetype.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="bg-white/15 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold">{results.CGPA || "—"}</p>
          <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">CGPA</p>
        </div>
        <div className="bg-white/15 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold">{completedSems}</p>
          <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">Semesters</p>
        </div>
        <div className="bg-white/15 rounded-xl p-3 text-center">
          <p className={`text-2xl font-bold ${backlogs > 0 ? "text-red-200" : "text-green-200"}`}>
            {backlogs}
          </p>
          <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">Backlogs</p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="mt-5">
          <p className="text-white/60 text-[10px] uppercase tracking-widest mb-3 font-semibold">
            Achievements Unlocked
          </p>
          <div className="flex flex-wrap gap-2">
            {badges.map((b: Badge) => (
              <div
                key={b.id}
                title={b.desc}
                className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 cursor-help"
              >
                <span className="text-sm">{b.emoji}</span>
                <span className="text-xs font-semibold">{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
