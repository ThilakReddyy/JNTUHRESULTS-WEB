"use client";
import { SyllabusNode, PdfItem, syllabusDetails } from "@/constants/syllabusdetails";
import { FaFilePdf } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import GoogleDocViewer from "@/components/googledocviewer/GoogleDocViewer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

// Level labels matching the syllabus structure depth
const LEVEL_LABELS = ["Degree", "Regulation", "Year", "Syllabus", "Branch"];

export default function SyllabusPage() {
  const [path, setPath] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const isPdfList = (node: SyllabusNode): node is PdfItem[] =>
    Array.isArray(node);

  const currentNode = useMemo(() => {
    let node: SyllabusNode = syllabusDetails;
    for (const key of path) {
      if (!Array.isArray(node)) {
        node = node[key];
      }
    }
    return node;
  }, [path]);

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
      className={`min-h-screen dark:bg-black bg-white dark:text-white text-black
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
                  className={`cursor-pointer hover:underline ${i === breadcrumbs.length - 1 ? "font-semibold" : "opacity-50"
                    }`}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </div>

          {/* Level label */}
          {!isPdfList(currentNode) && (
            <p className="text-xs uppercase tracking-widest opacity-40 mb-3">
              Select {LEVEL_LABELS[Math.min(path.length, LEVEL_LABELS.length - 1)]}
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
              <div key={index} className="mb-3">
                {/* PDF title row */}
                <div className="flex items-center gap-2 border border-black dark:border-white p-4 mb-2">
                  <FaFilePdf className="text-red-600 text-lg flex-shrink-0" />
                  <span className="text-sm font-medium">{pdf.title}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {/* Mobile — open in dialog */}
                  <Dialog>
                    <DialogTrigger
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPdf(pdf.link);
                      }}
                      className="block lg:hidden flex-1 text-sm px-4 py-2 border border-black dark:border-white
                                 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                                 transition text-center"
                    >
                      Open
                    </DialogTrigger>
                    <DialogContent className="w-[95%] my-2 bg-transparent pt-8 pb-1 px-1">
                      <GoogleDocViewer url={pdf.link} splNote="syllabus" />
                    </DialogContent>
                  </Dialog>

                  {/* Desktop — download */}
                  <Link
                    href={pdf.link}
                    target="_blank"
                    className="hidden lg:block flex-1 text-sm px-4 py-2 border border-black dark:border-white
                               hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                               transition text-center"
                  >
                    Download PDF
                  </Link>

                  {/* View full-screen */}
                  <button
                    onClick={() => setSelectedPdf(pdf.link)}
                    className="flex-1 text-sm px-4 py-2 bg-black dark:bg-white text-white dark:text-black
                               hover:opacity-80 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        /* Full-screen PDF viewer */
        <div className="relative">
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
          <GoogleDocViewer url={selectedPdf} splNote="syllabus" />
        </div>
      )}
    </div>
  );
}
