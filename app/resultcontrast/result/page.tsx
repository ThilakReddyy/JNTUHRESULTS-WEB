"use client";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

/* ── helpers ── */
const gradeColor = (val: string | undefined) => {
  if (!val || val === "-") return "text-gray-500 dark:text-gray-400";
  const n = parseFloat(val);
  if (isNaN(n)) return "text-gray-600 dark:text-gray-300";
  if (n >= 9) return "text-emerald-600 dark:text-emerald-400 font-bold";
  if (n >= 7) return "text-blue-600 dark:text-blue-400 font-semibold";
  if (n >= 5) return "text-yellow-600 dark:text-yellow-400 font-semibold";
  return "text-red-600 dark:text-red-400 font-bold";
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 px-4 py-3 bg-[#0b3954]">
    <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
    <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
  </div>
);

const ColHeader = ({ isresult = true }: { isresult?: boolean }) => (
  <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
    <th className={`px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ${isresult ? "" : "hidden md:block"}`} style={{ border: "none" }}>
      Attribute
    </th>
    <th className={`px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 `} style={{ border: "none" }}>
      Student 1
    </th>
    <th className={`px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 `} style={{ border: "none" }}>
      Student 2
    </th>
  </tr>
);

interface RowProps {
  label: string;
  value1?: string;
  value2?: string;
  colored?: boolean;
  index: number;
  isresult?: boolean;
}
const Row: React.FC<RowProps> = ({ label, value1, value2, colored, index, isresult = true }) => {
  const rowBg = index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/80 dark:bg-white/[0.03]";
  return (
    <tr className={`border-b border-gray-100 dark:border-white/5 ${rowBg}`}>
      <td className={`px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide ${isresult ? "" : "hidden md:block"}`} style={{ border: "none" }}>
        {label}
      </td>
      <td className={`px-4 py-2.5 text-sm ${isresult ? "text-center" : "text-left md:text-center"}  ${colored ? gradeColor(value1) : "text-gray-700 dark:text-gray-200"}`} style={{ border: "none" }}>
        {value1 || "—"}
      </td>
      <td className={`px-4 py-2.5 text-sm ${isresult ? "text-center" : "text-left md:text-center"} ${colored ? gradeColor(value2) : "text-gray-700 dark:text-gray-200"}`} style={{ border: "none" }}>
        {value2 || "—"}
      </td>
    </tr>
  );
};

function ResultContrastPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<CreditContrastReport | null>(null);

  useEffect(() => {
    toast.dismiss();
    const htno = searchParams.get("htno")?.toUpperCase();
    const htno2 = searchParams.get("htno2")?.toUpperCase();
    const localkey = htno + "-" + htno2 + "-CreditContrastreport";
    const results = getFromLocalStorage(localkey);
    setResults(results);
    if (results == null) {
      router.push("/resultcontrast");
      return;
    }
  }, [searchParams, router]);

  return results == null ? (
    <div className="mx-auto px-3 py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
      Details not found
    </div>
  ) : (
    <div className="mx-auto px-3 pb-6 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
      {/* Page header */}
      <div className="text-center py-6">
        <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          Result Contrast
        </h1>
        <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
          Side-by-side Academic Comparison
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Personal Details ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
          <SectionHeader title="Personal Details" />
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: "collapse", borderSpacing: 0, border: "none", width: "100%" }}>
              <thead><ColHeader isresult={false} /></thead>
              <tbody>
                <Row index={0} label="Name" value1={results.studentProfiles[0]["name"]} value2={results.studentProfiles[1]["name"]} isresult={false} />
                <Row index={1} label="Roll No" value1={results.studentProfiles[0]["rollNumber"]} value2={results.studentProfiles[1]["rollNumber"]} isresult={false} />
                <Row index={2} label="College Code" value1={results.studentProfiles[0]["collegeCode"]} value2={results.studentProfiles[1]["collegeCode"]} isresult={false} />
                <Row index={3} label="Father's Name" value1={results.studentProfiles[0]["fatherName"]} value2={results.studentProfiles[1]["fatherName"]} isresult={false} />
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Academic Results (semester-wise) ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
          <SectionHeader title="Semester-wise SGPA" />
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: "collapse", borderSpacing: 0, border: "none", width: "100%" }}>
              <thead><ColHeader /></thead>
              <tbody>
                {results.semesters.map((semester, index: number) => (
                  <Row
                    key={index}
                    index={index}
                    colored
                    label={`${semester[0].semester}`}
                    value1={
                      semester[0].semesterCredits !== "-"
                        ? `${semester[0].semesterSGPA} | ${semester[0].semesterCredits}`
                        : "—"
                    }
                    value2={
                      semester[1].semesterCredits !== "-"
                        ? `${semester[1].semesterSGPA} | ${semester[0].semesterCredits}`
                        : "—"
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Performance Analysis ── */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
          <SectionHeader title="Performance Analysis" />
          <div className="overflow-x-auto">
            <table style={{ borderCollapse: "collapse", borderSpacing: 0, border: "none", width: "100%" }}>
              <thead><ColHeader /></thead>
              <tbody>
                <Row
                  index={0}
                  colored
                  label="Overall CGPA"
                  value1={results.studentProfiles[0]["backlogs"] == "0" ? results.studentProfiles[0]["CGPA"] : "—"}
                  value2={results.studentProfiles[1]["backlogs"] == "0" ? results.studentProfiles[1]["CGPA"] : "—"}
                />
                <Row index={1} label="Credits Obtained" value1={results.studentProfiles[0]["credits"]} value2={results.studentProfiles[1]["credits"]} />
                <Row
                  index={2}
                  label="Backlogs"
                  value1={results.studentProfiles[0]["backlogs"]}
                  value2={results.studentProfiles[1]["backlogs"]}
                  colored
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-[6px] text-gray-400 mt-6">
        jntuhresults.vercel.app
      </div>
    </div>
  );
}

export default ResultContrastPage;
