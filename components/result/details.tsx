import { branchDetails } from "@/constants/branchdetails";
import { collegedata } from "@/constants/colleges";
import React from "react";

interface ResultDetailsProps {
  details: Record<string, any>;
  cmm?: boolean;
  showInstitution?: boolean;
}

interface InfoCellProps {
  label: string;
  value: string;
  wide?: boolean;
  show?: boolean;
}

const InfoCell = ({ label, value, show = true }: InfoCellProps) => (
  <div
    className={`flex flex-col gap-1 px-4 py-3 ${show ? "" : "hidden md:block"}`}
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">
      {value || "—"}
    </p>
  </div>
);

const CmmInfoCell = ({ label, value, show = true }: InfoCellProps) => (
  <div
    className={`min-h-16 bg-[#edf3e7] px-4 py-3 text-[#17211e] dark:bg-[#111827] dark:text-gray-100 ${show ? "" : "hidden md:block"}`}
  >
    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#53605a] dark:text-gray-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-bold leading-snug">{value || "—"}</p>
  </div>
);

const ResultDetails = ({
  details,
  cmm = false,
  showInstitution = true,
}: ResultDetailsProps) => {
  const collegeName = collegedata[details["collegeCode"]] ?? "—";
  const branch = branchDetails[details["rollNumber"]?.substring(6, 8)] ?? "—";

  if (cmm) {
    return (
      <section className="mb-4 border border-[#2a342f] bg-[#2a342f] shadow-sm dark:border-white/[0.15] dark:bg-white/[0.15]">
        <div className="bg-[#dce5d8] px-4 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#17211e] dark:bg-[#172033] dark:text-gray-100">
          Student Details
        </div>
        <div
          className={`grid grid-cols-1 gap-px border-t border-[#2a342f] bg-[#2a342f] dark:border-white/[0.15] dark:bg-white/[0.15] ${
            showInstitution
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }`}
        >
          <CmmInfoCell label="Student Name" value={details.name} />
          <CmmInfoCell label="Hall Ticket No." value={details.rollNumber} />
          {showInstitution && (
            <CmmInfoCell
              label="College Code"
              value={details.collegeCode}
              show={false}
            />
          )}
          <CmmInfoCell
            label="Father's Name"
            value={details.fatherName}
            show={false}
          />
          {showInstitution && (
            <>
              <div className="lg:col-span-2">
                <CmmInfoCell label="College Name" value={collegeName} />
              </div>
              <div className="lg:col-span-2">
                <CmmInfoCell label="Branch" value={branch} />
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm mb-4">
      {/* Primary info row */}
      <div
        className={`grid grid-cols-1 bg-white dark:bg-white/5 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-white/10 ${
          showInstitution ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        <InfoCell label="Student Name" value={details.name} />
        <InfoCell label="Roll Number" value={details.rollNumber} />
        {showInstitution && (
          <InfoCell
            label="College Code"
            value={details.collegeCode}
            show={false}
          />
        )}
        <InfoCell
          label="Father's Name"
          value={details.fatherName}
          show={false}
        />
      </div>

      {/* Secondary info row */}
      {showInstitution && (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-[#0b3954]/40 border-t border-gray-100 dark:border-white/10 divide-x divide-gray-100 dark:divide-white/10">
          <InfoCell label="College Name" value={collegeName} />
          <InfoCell label="Branch" value={branch} />
        </div>
      )}
    </div>
  );
};

export default ResultDetails;
