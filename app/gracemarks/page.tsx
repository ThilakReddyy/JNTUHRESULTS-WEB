"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Form from "@/components/forms/resulthtnoform";
import Footer from "@/components/footer/footer";
import AcademicResult from "@/components/result/academicresult";
import {
  fetchGraceMarksEligibility,
  uploadGraceMarksProof,
  validateProofFile,
  ACCEPTED_PROOF_MIME,
  type GraceMarksEligibility,
  type GraceMarksUploadResult,
} from "@/components/api/fetchResults";

type Phase = "form" | "eligible" | "blocked" | "success";

const GraceMarksPage = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [activeRoll, setActiveRoll] = useState("");

  const [phase, setPhase] = useState<Phase>("form");
  const [checking, setChecking] = useState(false);
  const [eligibility, setEligibility] = useState<GraceMarksEligibility | null>(
    null,
  );

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] =
    useState<GraceMarksUploadResult | null>(null);

  const resetToForm = () => {
    setPhase("form");
    setEligibility(null);
    setFile(null);
    setFileError(null);
    setUploadResult(null);
  };

  const onCheckEligibility = async () => {
    if (checking) return;
    const roll = hallticketno.trim().toUpperCase();
    if (roll.length !== 10) {
      toast.error("The Hallticket should be of 10 digits");
      return;
    }

    setChecking(true);
    setUploadResult(null);
    setEligibility(null);
    toast.loading("Checking eligibility...");

    const result = await fetchGraceMarksEligibility(roll);
    toast.dismiss();

    setEligibility(result);
    setActiveRoll(roll);

    if (result.kind === "eligible") {
      setPhase("eligible");
    } else if (result.kind === "rate_limited") {
      toast.error(result.message);
      setPhase("form");
    } else if (result.kind === "error") {
      toast.error(result.message);
      setPhase("form");
    } else {
      setPhase("blocked");
    }

    setChecking(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null;
    setFile(picked);
    setUploadResult(null);
    setFileError(picked ? validateProofFile(picked) : null);
  };

  const onUpload = async () => {
    if (uploading) return;
    const err = validateProofFile(file);
    if (err) {
      setFileError(err);
      return;
    }
    setFileError(null);
    setUploading(true);
    toast.loading("Uploading proof...");

    const result = await uploadGraceMarksProof(activeRoll, file as File);
    toast.dismiss();
    setUploadResult(result);

    if (result.kind === "success") {
      setPhase("success");
    } else if (result.kind === "rate_limited") {
      toast.error(result.message);
    } else {
      toast.error(result.message);
    }
    setUploading(false);
  };

  if (phase === "form") {
    return (
      <>
        <Form
          onSubmit={onCheckEligibility}
          title="Grace Marks Update"
          hallticketno={hallticketno}
          sethallticketno={sethallticketno}
          isDisabled={checking}
        />
        <div className="mx-auto max-w-2xl px-4 mt-6 text-xs lg:text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
          Available for B.Tech and B.Pharm students. We will first check your
          eligible backlogs, then ask you to upload your official consolidated
          marksheet issued by the university (PDF / PNG / JPEG, up to 5&nbsp;MB).
        </div>
        <Footer />
      </>
    );
  }

  if (
    phase === "blocked" &&
    eligibility &&
    eligibility.kind === "not_eligible"
  ) {
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-white dark:bg-white/5 shadow-sm p-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Roll Number {activeRoll}
            </p>
            <h2 className="mt-2 text-lg lg:text-2xl font-bold text-[#0b3954] dark:text-amber-300">
              Not eligible
            </h2>
            <p className="mt-4 text-sm lg:text-base text-gray-700 dark:text-gray-200 leading-relaxed">
              {eligibility.message}
            </p>
            <button
              type="button"
              onClick={resetToForm}
              className="mt-6 text-sm md:text-base px-4 py-1.5 rounded bg-black dark:bg-gray-300 dark:text-black text-white"
            >
              Try another roll number
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (phase === "eligible" && eligibility && eligibility.kind === "eligible") {
    const backlogList = eligibility.raw as Record<string, any>;
    return (
      <>
        <div className="mx-auto max-w-5xl px-3 pb-6">
          <div className="text-center py-6">
            <h1 className="font-extrabold text-lg lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
              Grace Marks Proof
            </h1>
            <p className="text-[9px] lg:text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">
              Roll Number {activeRoll}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-red-200 dark:border-red-900/40 shadow-sm my-4">
            <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-white/5">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Eligible Backlogs
              </span>
              <span className="text-2xl font-extrabold text-red-500 dark:text-red-400">
                {eligibility.totalBacklogs}
              </span>
            </div>
          </div>

          {eligibility.semesters.length > 0 && (
            <AcademicResult result={backlogList} academic={false} />
          )}

          <ProofUploader
            file={file}
            fileError={fileError}
            uploading={uploading}
            uploadResult={uploadResult}
            onFileChange={onFileChange}
            onUpload={onUpload}
            onChangeRoll={resetToForm}
          />
        </div>
        <Footer />
      </>
    );
  }

  if (phase === "success" && uploadResult && uploadResult.kind === "success") {
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-white dark:bg-white/5 shadow-sm p-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Roll Number {uploadResult.rollNumber}
            </p>
            <h2 className="mt-2 text-lg lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              Proof submitted
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Uploaded at{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {formatTimestamp(uploadResult.uploadedAt)}
              </span>
            </p>

            <div className="mt-6 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/20 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                Under Review
              </p>
              <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                Your proof is now under review. Once it&apos;s approved, the
                grace marks will be reflected in the JNTUH Connect database
                against your roll number.
              </p>
            </div>
            <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
              You don&apos;t need to resubmit unless we ask for a clearer copy.
            </p>

            <button
              type="button"
              onClick={resetToForm}
              className="mt-6 block mx-auto text-xs underline text-gray-500 dark:text-gray-400"
            >
              Submit for another roll number
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return null;
};

const formatTimestamp = (iso: string) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

interface ProofUploaderProps {
  file: File | null;
  fileError: string | null;
  uploading: boolean;
  uploadResult: GraceMarksUploadResult | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onChangeRoll: () => void;
}

const ProofUploader = ({
  file,
  fileError,
  uploading,
  uploadResult,
  onFileChange,
  onUpload,
  onChangeRoll,
}: ProofUploaderProps) => {
  const failure =
    uploadResult && uploadResult.kind === "failure" ? uploadResult : null;
  const rateLimited =
    uploadResult && uploadResult.kind === "rate_limited" ? uploadResult : null;
  const canSubmit = !!file && !fileError && !uploading;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-5 mt-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Upload Official Consolidated Marksheet
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
        Upload the official consolidated marksheet issued by the university (the
        one that lists all your semesters and grace marks). PDF, PNG or JPEG, up
        to 5&nbsp;MB. One file per submission.
      </p>

      <label className="mt-4 block">
        <span className="sr-only">Official consolidated marksheet</span>
        <input
          type="file"
          accept={ACCEPTED_PROOF_MIME.join(",")}
          onChange={onFileChange}
          disabled={uploading}
          className="block w-full text-xs lg:text-sm text-gray-700 dark:text-gray-200
            file:mr-3 file:py-1.5 file:px-3 file:rounded
            file:border-0 file:text-xs file:font-semibold
            file:bg-black file:text-white
            dark:file:bg-gray-200 dark:file:text-black
            cursor-pointer"
        />
      </label>

      {file && !fileError && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate">
          {file.name} · {(file.size / 1024).toFixed(1)} KB
        </div>
      )}
      {fileError && (
        <div className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {fileError}
        </div>
      )}

      {failure && (
        <div className="mt-3 rounded border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-900/20 px-3 py-2 text-xs text-red-700 dark:text-red-300">
          {failure.message}
          {failure.retriable && (
            <span className="ml-1 text-red-500/80">
              You can retry without re-picking the file.
            </span>
          )}
        </div>
      )}

      {rateLimited && (
        <div className="mt-3 rounded border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/20 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
          {rateLimited.message}
        </div>
      )}

      <div className="flex items-center justify-between mt-5">
        <button
          type="button"
          onClick={onChangeRoll}
          disabled={uploading}
          className="text-xs underline text-gray-500 dark:text-gray-400 disabled:opacity-50"
        >
          Use a different roll number
        </button>
        <button
          type="button"
          onClick={onUpload}
          disabled={!canSubmit}
          className="text-sm md:text-base px-4 py-1.5 rounded bg-black dark:bg-gray-300 dark:text-black text-white disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Marksheet"}
        </button>
      </div>
    </div>
  );
};

export default GraceMarksPage;
