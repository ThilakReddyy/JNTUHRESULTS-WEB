"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Footer from "@/components/footer/footer";
import ResultDetails from "@/components/result/details";
import {
  fetchPendingProofs,
  fetchProofDetail,
  type GraceMarksPendingProof,
  type GraceMarksProofDetailResult,
} from "@/components/api/fetchResults";

const formatTimestamp = (iso: string) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const formatBytes = (size: number) => {
  if (!Number.isFinite(size) || size <= 0) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const isImage = (contentType: string) =>
  contentType?.startsWith("image/") ?? false;
const isPdf = (contentType: string) => contentType === "application/pdf";

const GraceMarksAdminPage = () => {
  const [adminKey, setAdminKey] = useState("");
  const [authed, setAuthed] = useState(false);

  const [loadingList, setLoadingList] = useState(false);
  const [proofs, setProofs] = useState<GraceMarksPendingProof[]>([]);
  const [listCount, setListCount] = useState<number | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState<GraceMarksProofDetailResult | null>(null);

  const clearKey = (message: string) => {
    setAdminKey("");
    setAuthed(false);
    setProofs([]);
    setListCount(null);
    setSelectedId(null);
    setDetail(null);
    toast.error(message);
  };

  const onLoadPending = async () => {
    const key = adminKey.trim();
    if (!key) {
      toast.error("Enter the admin key first.");
      return;
    }
    if (loadingList) return;

    setLoadingList(true);
    setSelectedId(null);
    setDetail(null);

    const result = await fetchPendingProofs(key);

    if (result.kind === "ok") {
      setAuthed(true);
      setProofs(result.proofs);
      setListCount(result.count);
      if (result.count === 0) {
        toast.success("No pending proofs.");
      }
    } else if (result.kind === "unauthorized") {
      clearKey("Invalid admin key.");
    } else {
      toast.error(result.message);
    }

    setLoadingList(false);
  };

  const onSelect = async (proofId: string) => {
    if (loadingDetail) return;
    const key = adminKey.trim();
    if (!key) {
      toast.error("Enter the admin key first.");
      return;
    }
    setSelectedId(proofId);
    setLoadingDetail(true);
    setDetail(null);

    const result = await fetchProofDetail(proofId, key);

    if (result.kind === "unauthorized") {
      clearKey("Invalid admin key.");
      setLoadingDetail(false);
      return;
    }
    if (result.kind === "rate_limited" || result.kind === "error") {
      toast.error(result.message);
    }
    setDetail(result);
    setLoadingDetail(false);
  };

  return (
    <>
      <div className="mx-auto max-w-5xl px-3 pb-10">
        <div className="text-center py-6">
          <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
            Grace Marks Review
          </h1>
          <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
            Admin Only
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-5">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Admin Key
            </span>
            <input
              type="password"
              autoComplete="off"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onLoadPending();
              }}
              placeholder="Paste admin key"
              className="mt-2 w-full rounded border border-gray-200 dark:border-white/10 bg-white dark:bg-black/30 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </label>
          <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
            Stored in memory only. Same key is sent under{" "}
            <code className="font-mono">X-Admin-Key</code> for the list and{" "}
            <code className="font-mono">x-api-key</code> for each detail fetch.
          </p>

          <div className="flex items-center justify-end mt-4">
            <button
              type="button"
              onClick={onLoadPending}
              disabled={loadingList || !adminKey.trim()}
              className="text-sm md:text-base px-4 py-1.5 rounded bg-black dark:bg-gray-300 dark:text-black text-white disabled:opacity-50"
            >
              {loadingList ? "Loading..." : "Load Pending Proofs"}
            </button>
          </div>
        </div>

        {authed && (
          <div className="mt-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Pending Proofs
              </span>
              <span className="text-sm font-bold text-[#0b3954] dark:text-sky-300">
                {listCount ?? proofs.length} shown
              </span>
            </div>
            {proofs.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                No pending proofs.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-white/10">
                {proofs.map((p) => {
                  const active = selectedId === p.id;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(p.id)}
                        className={`w-full text-left px-5 py-3 flex items-center justify-between gap-3 transition ${
                          active
                            ? "bg-sky-50 dark:bg-sky-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#0b3954] dark:text-sky-200">
                            {p.rollNumber}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {p.originalFilename} · {formatBytes(p.fileSize)}
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {formatTimestamp(p.uploadedAt)}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {selectedId && (
          <ProofDetailPanel
            loading={loadingDetail}
            result={detail}
            onClose={() => {
              setSelectedId(null);
              setDetail(null);
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

interface ProofDetailPanelProps {
  loading: boolean;
  result: GraceMarksProofDetailResult | null;
  onClose: () => void;
}

const ProofDetailPanel = ({ loading, result, onClose }: ProofDetailPanelProps) => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Proof Detail
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs underline text-gray-500 dark:text-gray-400"
        >
          Close
        </button>
      </div>

      {loading && (
        <div className="px-5 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
          Loading…
        </div>
      )}

      {!loading && result && result.kind === "not_found" && (
        <div className="px-5 py-6 text-sm text-red-600 dark:text-red-400">
          {result.message}
        </div>
      )}

      {!loading && result && result.kind === "rate_limited" && (
        <div className="px-5 py-6 text-sm text-amber-600 dark:text-amber-400">
          {result.message}
        </div>
      )}

      {!loading && result && result.kind === "error" && (
        <div className="px-5 py-6 text-sm text-red-600 dark:text-red-400">
          {result.message}
        </div>
      )}

      {!loading && result && result.kind === "ok" && (
        <ProofDetailBody proof={result.proof} backlogs={result.backlogs} />
      )}
    </div>
  );
};

interface ProofDetailBodyProps {
  proof: import("@/components/api/fetchResults").GraceMarksPendingProof;
  backlogs: Record<string, any>;
}

const ProofDetailBody = ({ proof, backlogs }: ProofDetailBodyProps) => {
  const studentDetails =
    backlogs && typeof backlogs.details === "object" ? backlogs.details : null;
  const results =
    backlogs && typeof backlogs.results === "object" ? backlogs.results : null;
  const totalBacklogs =
    results && typeof results.totalBacklogs === "number"
      ? results.totalBacklogs
      : null;
  const hasSemesters = !!results && Array.isArray(results.semesters);
  const queuedMessage =
    !results && (backlogs?.message || backlogs?.status)
      ? backlogs?.message || `Backlogs queued (status: ${backlogs?.status}).`
      : null;

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <Detail label="Roll Number" value={proof.rollNumber} mono />
        <Detail label="Uploaded" value={formatTimestamp(proof.uploadedAt)} />
        <Detail label="File" value={proof.originalFilename} />
        <Detail
          label="Size / Type"
          value={`${formatBytes(proof.fileSize)} · ${proof.contentType}`}
        />
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          Uploaded Marksheet
        </div>
        <ProofPreview
          downloadUrl={proof.downloadUrl}
          contentType={proof.contentType}
        />
        <a
          href={proof.downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs underline text-sky-700 dark:text-sky-300"
        >
          Open in new tab ↗
        </a>
        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
          Presigned link valid ~1 hour. Reload the row to refresh.
        </p>
      </div>

      {studentDetails && <ResultDetails details={studentDetails} />}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Current Backlogs
          </span>
          {totalBacklogs !== null && (
            <span className="text-lg font-extrabold text-red-500 dark:text-red-400">
              {totalBacklogs}
            </span>
          )}
        </div>

        {queuedMessage && (
          <div className="rounded border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
            {queuedMessage}
          </div>
        )}

        {hasSemesters && results.semesters.length > 0 && (
          <div className="flex flex-col gap-6">
            {results.semesters.map((sem: Record<string, any>, i: number) => (
              <SemesterMarks key={`${sem.semester}-${i}`} semester={sem} />
            ))}
          </div>
        )}

        {hasSemesters && results.semesters.length === 0 && (
          <div className="rounded border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/20 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
            No failing semesters reported.
          </div>
        )}
      </div>
    </div>
  );
};

const gradeBadge = (grade: string) => {
  if (!grade)
    return "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400";
  const g = grade.toUpperCase();
  if (g === "F")
    return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400";
  if (g === "O")
    return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400";
  if (g === "A+")
    return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400";
  if (g === "A")
    return "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400";
  if (g === "B+")
    return "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400";
  if (g === "B")
    return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400";
  if (g === "C")
    return "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400";
  return "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300";
};

const renderMark = (value: unknown) =>
  typeof value === "number" ? value : value == null ? "—" : String(value);

const SemesterMarks = ({ semester }: { semester: Record<string, any> }) => {
  const subjects: Record<string, any>[] = Array.isArray(semester.subjects)
    ? semester.subjects
    : [];
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0b3954]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            {semester.semester}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {typeof semester.backlogs === "number" && (
            <span className="text-[10px] font-semibold text-red-200 uppercase tracking-wider">
              Backlogs <span className="text-white">{semester.backlogs}</span>
            </span>
          )}
          {semester.semesterSGPA && (
            <span className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider">
              SGPA <span className="text-white">{semester.semesterSGPA}</span>
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <th className="px-2.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Code
              </th>
              <th className="px-2.5 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 min-w-[220px]">
                Subject
              </th>
              <th className="px-2.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Int.
              </th>
              <th className="px-2.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Ext.
              </th>
              <th className="px-2.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Total
              </th>
              <th className="px-2.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Grade
              </th>
              <th className="px-2.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Cr.
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, idx) => (
              <tr
                key={s.subjectCode || idx}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-transparent"
                    : "bg-gray-50/80 dark:bg-white/[0.03]"
                }
              >
                <td className="px-2.5 py-2.5 text-xs font-mono font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {s.subjectCode}
                </td>
                <td className="px-2.5 py-2.5 text-gray-700 dark:text-gray-200">
                  {s.subjectName}
                </td>
                <td className="px-2.5 py-2.5 text-center text-gray-700 dark:text-gray-200 tabular-nums">
                  {renderMark(s.internalMarks)}
                </td>
                <td className="px-2.5 py-2.5 text-center text-gray-700 dark:text-gray-200 tabular-nums">
                  {renderMark(s.externalMarks)}
                </td>
                <td className="px-2.5 py-2.5 text-center font-semibold text-gray-800 dark:text-gray-100 tabular-nums">
                  {renderMark(s.totalMarks)}
                </td>
                <td className="px-2.5 py-2.5 text-center">
                  <span
                    className={`inline-flex items-center justify-center min-w-[36px] px-2 py-0.5 rounded-md text-xs font-bold ${gradeBadge(
                      s.grades,
                    )}`}
                  >
                    {s.grades || "—"}
                  </span>
                </td>
                <td className="px-2.5 py-2.5 text-center text-gray-700 dark:text-gray-200 tabular-nums">
                  {renderMark(s.credits)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Detail = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div>
    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
      {label}
    </div>
    <div
      className={`mt-0.5 text-gray-800 dark:text-gray-100 truncate ${
        mono ? "font-mono" : ""
      }`}
    >
      {value}
    </div>
  </div>
);

interface ProofPreviewProps {
  downloadUrl: string;
  contentType: string;
}

const ProofPreview = ({ downloadUrl, contentType }: ProofPreviewProps) => {
  if (isImage(contentType)) {
    return (
      <div className="rounded border border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={downloadUrl}
          alt="Uploaded marksheet"
          className="block max-h-[600px] w-full object-contain"
        />
      </div>
    );
  }
  if (isPdf(contentType)) {
    return (
      <iframe
        src={downloadUrl}
        title="Uploaded marksheet"
        className="w-full h-[600px] rounded border border-gray-200 dark:border-white/10 bg-white"
      />
    );
  }
  return (
    <div className="rounded border border-gray-200 dark:border-white/10 px-3 py-4 text-xs text-gray-500 dark:text-gray-400">
      Preview not supported for {contentType}. Use the link below to download.
    </div>
  );
};

export default GraceMarksAdminPage;
