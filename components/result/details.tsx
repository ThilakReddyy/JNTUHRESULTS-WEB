import { branchDetails } from "@/constants/branchdetails";
import { collegedata } from "@/constants/colleges";
import React from "react";

interface ResultDetailsProps {
  details: Record<string, any>;
}

interface InfoCellProps {
  label: string;
  value: string;
  wide?: boolean;
  show?: boolean;
}

const InfoCell = ({ label, value, show = true }: InfoCellProps) => (
  <div className={`flex flex-col gap-1 px-4 py-3 ${show ? "" : "hidden md:block"}`}>
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">
      {value || "—"}
    </p>
  </div>
);

const ResultDetails = ({ details }: ResultDetailsProps) => {
  const collegeName = collegedata[details["collegeCode"]] ?? "—";
  const branch = branchDetails[details["rollNumber"]?.substring(6, 8)] ?? "—";

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm mb-4">
      {/* Primary info row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white dark:bg-white/5 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-white/10">
        <InfoCell label="Student Name" value={details.name} />
        <InfoCell label="Roll Number" value={details.rollNumber} />
        <InfoCell label="College Code" value={details.collegeCode} show={false} />
        <InfoCell label="Father's Name" value={details.fatherName} show={false} />
      </div>

      {/* Secondary info row */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-[#0b3954]/40 border-t border-gray-100 dark:border-white/10 divide-x divide-gray-100 dark:divide-white/10">
        <InfoCell label="College Name" value={collegeName} />
        <InfoCell label="Branch" value={branch} />
      </div>
    </div>
  );
};

export default ResultDetails;
