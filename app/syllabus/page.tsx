"use client";
import { SyllabusNode, PdfItem, syllabusDetails } from "@/constants/syllabusdetails";
import { FaFilePdf } from "react-icons/fa";

import { useMemo, useState } from "react";
import GoogleDocViewer from "@/components/googledocviewer/GoogleDocViewer";

export default function SyllabusPage() {
  const [path, setPath] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const isPdfList = (node: SyllabusNode): node is PdfItem[] =>
    Array.isArray(node);

  // 🔥 Always derive currentNode from path
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


  return (
    <div
      className={`min-h-screen dark:bg-black bg-white dark:text-white text-black
    ${selectedPdf ? "pt-2" : "px-6 py-8"}`}
    >
      {!selectedPdf ?
        <div className="max-w-2xl mx-auto">

          <h1 className="text-xl font-semibold tracking-widest mb-8 text-center">
            SYLLABUS
          </h1>

          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center text-sm mb-6 space-x-2">
            <span
              onClick={() => setPath([])}
              className="cursor-pointer hover:underline"
            >
              Home
            </span>

            {path.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>/</span>
                <span
                  onClick={() => goToLevel(index + 1)}
                  className="cursor-pointer hover:underline"
                >
                  {item}
                </span>
              </div>
            ))}
          </div>


          {/* Folder View */}
          {!isPdfList(currentNode) &&
            Object.keys(currentNode).map((key) => (
              <div
                key={key}
                onClick={() => handleClick(key)}
                className="border border-black dark:border-white p-4 mb-3 cursor-pointer
                         hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition"
              >
                {key}
              </div>
            ))}

          {/* PDF View */}
          {!selectedPdf &&
            isPdfList(currentNode) &&
            currentNode.map((pdf, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPdf(pdf.link);
                }}
                rel="noreferrer"
                className="flex cursor-pointer items-center gap-2 border border-black dark:border-white p-4 mb-3
             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition"
              >

                <FaFilePdf className="text-red-600 text-lg" />
                {pdf.title}
              </div>
            ))
          }
        </div>
        : (
          <div className="mt-4 relative">
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
