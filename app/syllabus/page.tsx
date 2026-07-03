"use client";
import {
  SyllabusNode,
  PdfItem,
  syllabusDetails as fallbackSyllabus,
} from "@/constants/syllabusdetails";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// Level labels matching the syllabus structure depth
const LEVEL_LABELS = ["Degree", "Regulation", "Year", "Syllabus", "Branch"];

const SYLLABUS_API =
  (process.env.NEXT_PUBLIC_URL || "http://localhost:8000/") + "api/syllabus";

export default function SyllabusPage() {
  // Syllabus tree, loaded from the backend (falls back to bundled static data).
  const [syllabus, setSyllabus] = useState<SyllabusNode>({});
  const [loading, setLoading] = useState(true);

  const [path, setPath] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    axios
      .get(SYLLABUS_API, { timeout: 15000 })
      .then((res) => {
        if (!active) return;
        const data =
          res.data && typeof res.data === "object" && Object.keys(res.data).length
            ? res.data
            : fallbackSyllabus;
        setSyllabus(data);
      })
      .catch(() => {
        if (active) setSyllabus(fallbackSyllabus);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const isPdfList = (node: SyllabusNode): node is PdfItem[] =>
    Array.isArray(node);

  const currentNode = useMemo(() => {
    let node: SyllabusNode = syllabus;
    for (const key of path) {
      if (!Array.isArray(node)) {
        node = node[key];
      }
    }
    return node;
  }, [path, syllabus]);

  const handleClick = (key: string) => {
    setPath((prev) => [...prev, key]);
  };

  const goToLevel = (index: number) => {
    setPath(path.slice(0, index));
    setSelectedPdf(null);
  };

  const breadcrumbs = [
    { label: "Home", levelIndex: 0 },
    ...path.map((key, i) => ({ label: key, levelIndex: i + 1 })),
  ];

  return (
    <div
      className={` dark:bg-black h-[93vh] bg-white dark:text-white text-black
      ${selectedPdf ? "" : "px-6 py-8"}`}
    >
      {!selectedPdf ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold tracking-widest mb-8 text-center uppercase">
            Syllabus
          </h1>

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center text-sm mb-6 gap-1">
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} className="opacity-40" />}
                <span
                  onClick={() => goToLevel(crumb.levelIndex)}
                  className={`cursor-pointer hover:underline ${
                    i === breadcrumbs.length - 1
                      ? "font-semibold"
                      : "opacity-50"
                  }`}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-xs uppercase tracking-widest opacity-40 mb-3">
              Loading…
            </p>
          )}

          {/* Level label */}
          {!loading && !isPdfList(currentNode) && (
            <p className="text-xs uppercase tracking-widest opacity-40 mb-3">
              Select{" "}
              {LEVEL_LABELS[Math.min(path.length, LEVEL_LABELS.length - 1)]}
            </p>
          )}

          {/* Folder items */}
          {!isPdfList(currentNode) &&
            Object.keys(currentNode).map((key) => (
              <div
                key={key}
                onClick={() => handleClick(key)}
                className="border border-black dark:border-white p-4 mb-3 cursor-pointer
                           hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                           transition flex items-center justify-between"
              >
                <span>{key}</span>
                <ChevronRight size={14} className="opacity-40" />
              </div>
            ))}

          {/* PDF list */}
          {isPdfList(currentNode) &&
            currentNode.map((pdf, index) => (
              <div
                key={index}
                className="mb-3 w-full flex gap-0 md:gap-4 flex-col md:flex-row"
              >
                {/* PDF title row */}
                <div className="flex items-center gap-2 border border-black dark:border-white p-4 mb-2 flex-1">
                  <FaFilePdf className="text-red-600 text-lg flex-shrink-0" />
                  <span className="text-sm font-medium">{pdf.title}</span>
                </div>

                {/* Actions */}

                {/* Desktop — download */}
                <Link
                  href={pdf.link}
                  target="_blank"
                  className="text-sm px-4 py-2 md:h-14 md:w-24 flex w-full items-center justify-center border border-black dark:border-white
                               hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white bg-white text-black
                               transition text-center"
                >
                  View
                </Link>
              </div>
            ))}
        </div>
      ) : (
        /* Full-screen PDF viewer */
        <div className="relative h-full">
          <button
            onClick={() => setSelectedPdf(null)}
            className="absolute top-2 right-2 z-10
                       bg-black dark:bg-white
                       text-white dark:text-black
                       w-8 h-8 rounded-full
                       flex items-center justify-center
                       hover:scale-110 transition"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
