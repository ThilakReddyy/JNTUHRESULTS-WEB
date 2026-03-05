"use client";
import { useEffect, useState, useMemo } from "react";
import {
  AcademicYearDetails,
  CalendarEntry,
  DegreeDetails,
  academicCalendars,
} from "@/constants/academiccalendars";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import GoogleDocViewer from "@/components/googledocviewer/GoogleDocViewer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaFilePdf } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Level = "academicYear" | "degree" | "year" | "calendar";

interface BreadcrumbItem {
  label: string;
  levelIndex: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const LEVEL_LABELS: Record<Level, string> = {
  academicYear: "Academic Year",
  degree: "Degree",
  year: "Year",
  calendar: "Calendar",
};

const Calendars = () => {
  // path = array of selected keys at each level
  const [path, setPath] = useState<string[]>([]);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const LEVELS: Level[] = ["academicYear", "degree", "year", "calendar"];

  // Derive the current set of options from the path
  const currentOptions = useMemo<string[]>(() => {
    if (path.length === 0) return Object.keys(academicCalendars);

    let node: any = academicCalendars;
    for (const key of path) {
      node = node[key];
      if (node == null) return [];
    }
    if (typeof node === "string") return []; // leaf = PDF link
    return Object.keys(node);
  }, [path]);

  // Derive the current level label
  const currentLevel: Level = LEVELS[Math.min(path.length, LEVELS.length - 1)];

  // Derive the PDF link when all 4 levels are selected
  const pdfLink = useMemo<string | null>(() => {
    if (path.length < 4) return null;
    let node: any = academicCalendars;
    for (const key of path) {
      node = node[key];
      if (node == null) return null;
    }
    return typeof node === "string" ? node : null;
  }, [path]);

  const handleSelect = (key: string) => {
    const newPath = [...path, key];
    setPath(newPath);
    setSelectedLink(null);
  };

  const goToLevel = (levelIndex: number) => {
    setPath(path.slice(0, levelIndex));
    setSelectedLink(null);
  };

  // Breadcrumb items
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", levelIndex: 0 },
    ...path.map((key, i) => ({ label: key, levelIndex: i + 1 })),
  ];

  return (
    <>
      {!selectedLink ? (
        <div className="min-h-screen dark:bg-black bg-white dark:text-white text-black px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold tracking-widest mb-8 text-center uppercase">
              Academic Calendars
            </h1>

            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center text-sm mb-6 gap-1">
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight size={12} className="opacity-40" />}
                  <span
                    onClick={() => goToLevel(crumb.levelIndex)}
                    className={`cursor-pointer hover:underline ${i === breadcrumbs.length - 1
                        ? "font-semibold"
                        : "opacity-50"
                      }`}
                  >
                    {crumb.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Level label */}
            {path.length < 4 && (
              <p className="text-xs uppercase tracking-widest opacity-40 mb-3">
                Select {LEVEL_LABELS[currentLevel]}
              </p>
            )}

            {/* Options list — folder items */}
            {pdfLink === null &&
              currentOptions.map((key) => (
                <div
                  key={key}
                  onClick={() => handleSelect(key)}
                  className="border border-black dark:border-white p-4 mb-3 cursor-pointer
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition flex items-center justify-between"
                >
                  <span>{key}</span>
                  <ChevronRight size={14} className="opacity-40" />
                </div>
              ))}

            {/* PDF leaf — open / download */}
            {pdfLink && (
              <div className="mt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2 border border-black dark:border-white p-4">
                  <FaFilePdf className="text-red-600 text-lg flex-shrink-0" />
                  <span className="text-sm font-medium">{path[path.length - 1]}</span>
                </div>

                <div className="flex gap-3">
                  {/* Mobile — open in dialog */}
                  <Dialog>
                    <DialogTrigger className="block lg:hidden flex-1 text-sm px-4 py-2 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition text-center">
                      Open
                    </DialogTrigger>
                    <DialogContent className="w-[95%] my-2 bg-transparent pt-8 pb-1 px-1">
                      <GoogleDocViewer url={pdfLink} splNote="calendar" />
                    </DialogContent>
                  </Dialog>

                  {/* Desktop — download link */}
                  <Link
                    href={pdfLink}
                    target="_blank"
                    className="hidden lg:block flex-1 text-sm px-4 py-2 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition text-center"
                  >
                    Download PDF
                  </Link>

                  {/* Mobile viewer */}
                  <button
                    onClick={() => setSelectedLink(pdfLink)}
                    className="flex-1 text-sm px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Full-screen PDF viewer */
        <div className="relative">
          <button
            onClick={() => setSelectedLink(null)}
            className="absolute top-2 right-2 z-10
                       bg-black dark:bg-white
                       text-white dark:text-black
                       w-8 h-8 rounded-full
                       flex items-center justify-center
                       hover:scale-110 transition"
          >
            ✕
          </button>
          <GoogleDocViewer url={selectedLink} splNote="calendar" />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Calendars;
