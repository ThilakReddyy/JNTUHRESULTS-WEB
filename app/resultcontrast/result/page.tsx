"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchCreditContrastReport } from "@/components/api/fetchResults";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";

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
  <div className="border-b border-[#2a342f] bg-[#dce5d8] px-4 py-2 text-center dark:border-white/[0.15] dark:bg-[#172033]">
    <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:text-gray-100">
      {title}
    </h3>
  </div>
);

const ColHeader = ({ isresult = true }: { isresult?: boolean }) => (
  <tr className="h-11 bg-[#e3e8de] text-[9px] font-bold uppercase tracking-wide dark:bg-white/[0.04]">
    <th
      className={`border-b border-r border-[#2a342f] px-4 text-left dark:border-white/[0.15] ${isresult ? "" : "hidden md:table-cell"}`}
    >
      Attribute
    </th>
    <th className="border-b border-r border-[#2a342f] px-4 text-center dark:border-white/[0.15]">
      Student 1
    </th>
    <th className="border-b border-[#2a342f] px-4 text-center dark:border-white/[0.15]">
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
const Row: React.FC<RowProps> = ({
  label,
  value1,
  value2,
  colored,
  isresult = true,
}) => {
  return (
    <tr className="h-11 bg-[#edf3e7] text-[11px] text-[#17211e] last:[&>td]:border-b-0 dark:bg-[#111827] dark:text-gray-100">
      <td
        className={`border-b border-r border-[#7b867f] px-4 text-xs font-semibold uppercase tracking-wide text-[#53605a] dark:border-white/10 dark:text-gray-400 ${isresult ? "" : "hidden md:table-cell"}`}
      >
        {label}
      </td>
      <td
        className={`border-b border-r border-[#7b867f] px-4 text-sm dark:border-white/10 ${isresult ? "text-center" : "text-left md:text-center"} ${colored ? gradeColor(value1) : ""}`}
      >
        {value1 || "—"}
      </td>
      <td
        className={`border-b border-[#7b867f] px-4 text-sm dark:border-white/10 ${isresult ? "text-center" : "text-left md:text-center"} ${colored ? gradeColor(value2) : ""}`}
      >
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
    const loadResult = async () => {
      toast.dismiss();
      const htno = searchParams.get("htno")?.toUpperCase();
      const htno2 = searchParams.get("htno2")?.toUpperCase();

      if (!htno || !htno2) {
        router.push("/resultcontrast");
        return;
      }

      const result = await fetchCreditContrastReport(htno, htno2);
      if (result) {
        setResults(result);
      } else {
        router.push("/resultcontrast");
      }
    };

    loadResult();
  }, [searchParams, router]);

  return results == null ? (
    <div className="mx-auto px-3 pb-6">
      <div className="py-6 text-center">
        <h1 className="text-lg font-extrabold uppercase tracking-tight text-[#0b3954] dark:text-sky-300 lg:text-3xl">
          Result Contrast
        </h1>
        <p className="mt-1 text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-500 lg:text-xs">
          Loading student comparison…
        </p>
      </div>
      <ResultDetailsSkeleton />
      <AcademicResultSkeleton />
    </div>
  ) : (
    <div className="mx-auto px-3 pb-6">
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
        <div className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]">
          <SectionHeader title="Personal Details" />
          <div className="overflow-x-auto">
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                border: "none",
                width: "100%",
              }}
            >
              <thead>
                <ColHeader isresult={false} />
              </thead>
              <tbody>
                <Row
                  index={0}
                  label="Name"
                  value1={results.studentProfiles[0]["name"]}
                  value2={results.studentProfiles[1]["name"]}
                  isresult={false}
                />
                <Row
                  index={1}
                  label="Roll No"
                  value1={results.studentProfiles[0]["rollNumber"]}
                  value2={results.studentProfiles[1]["rollNumber"]}
                  isresult={false}
                />
                <Row
                  index={2}
                  label="College Code"
                  value1={results.studentProfiles[0]["collegeCode"]}
                  value2={results.studentProfiles[1]["collegeCode"]}
                  isresult={false}
                />
                <Row
                  index={3}
                  label="Father's Name"
                  value1={results.studentProfiles[0]["fatherName"]}
                  value2={results.studentProfiles[1]["fatherName"]}
                  isresult={false}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Academic Results (semester-wise) ── */}
        <div className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]">
          <SectionHeader title="Semester-wise SGPA" />
          <div className="overflow-x-auto">
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                border: "none",
                width: "100%",
              }}
            >
              <thead>
                <ColHeader />
              </thead>
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
                        ? `${semester[1].semesterSGPA} | ${semester[1].semesterCredits}`
                        : "—"
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Performance Analysis ── */}
        <div className="overflow-hidden border border-[#2a342f] bg-[#edf3e7] shadow-sm dark:border-white/[0.15] dark:bg-[#111827]">
          <SectionHeader title="Performance Analysis" />
          <div className="overflow-x-auto">
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                border: "none",
                width: "100%",
              }}
            >
              <thead>
                <ColHeader />
              </thead>
              <tbody>
                <Row
                  index={0}
                  colored
                  label="Overall CGPA"
                  value1={
                    results.studentProfiles[0]["backlogs"] == "0"
                      ? results.studentProfiles[0]["CGPA"]
                      : "—"
                  }
                  value2={
                    results.studentProfiles[1]["backlogs"] == "0"
                      ? results.studentProfiles[1]["CGPA"]
                      : "—"
                  }
                />
                <Row
                  index={1}
                  label="Credits Obtained"
                  value1={results.studentProfiles[0]["credits"]}
                  value2={results.studentProfiles[1]["credits"]}
                />
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
        jntuhconnect.dhethi.com
      </div>
    </div>
  );
}

export default ResultContrastPage;
