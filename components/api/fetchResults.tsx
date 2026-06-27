import axios from "axios";
import { saveToLocalStorage } from "../customfunctions/localStorage";

import toast from "react-hot-toast";

export const fetchAcademicResult = async (
  htno: string,
): Promise<null | AcademicResulProps> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getAcademicResult?rollNumber=${htno}`;

    toast.loading("Fetching result...");

    const response = await axios.get(url, {
      timeout: 20 * 1000,
      validateStatus: () => true,
    });

    switch (response.status) {
      case 200: {
        if ("details" in response.data) {
          toast.dismiss();
          return response.data;
        }
        break;
      }

      case 202: {
        toast.dismiss();
        toast(
          response.data.message ||
          "Result is being prepared. Please check again shortly.",
        );
        return null;
      }

      case 409: {
        toast.dismiss();
        toast.error(
          response.data.message || "This roll number is already in the queue.",
        );
        return null;
      }
      case 423: {
        toast.dismiss();
        toast.error(
          response.data.message ||
          "Server is temporarily overloaded. Please try again later.",
        );
        return null;
      }
      case 424: {
        toast.dismiss();
        toast.error(
          response.data.message ||
          "Upstream JNTUH servers are down. Try again later.",
        );
        return null;
      }

      case 502: {
        toast.dismiss();
        toast.error("Upstream JNTUH servers are down. Try again later.");
        return null;
      }

      case 503: {
        toast.dismiss();
        toast.error("Server overloaded. Please try again later.");
        return null;
      }

      case 500: {
        toast.dismiss();
        toast.error("Unexpected server error occurred.");
        return null;
      }

      default: {
        toast.dismiss();
        toast.error("Unhandled response from server.");
        return null;
      }
    }

    toast.dismiss();
    return null;
  } catch (e: any) {
    toast.dismiss();

    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        toast.error("Request timed out. Try again later.");
      } else if (e.response) {
        toast.error(`Server error: ${e.response.status}`);
      } else {
        toast.error("Network issue. Please check your connection.");
      }
    } else {
      toast.error("Unexpected error occurred.");
    }

    return null;
  }
};
export const fetchAllResult = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getAllResult?rollNumber=${htno}`;

    toast.loading("Fetching result...");

    const response = await axios.get(url, {
      timeout: 20 * 1000,
      validateStatus: () => true,
    });

    switch (response.status) {
      case 200: {
        if ("details" in response.data) {
          saveToLocalStorage(
            htno + "-AllResult",
            JSON.stringify(response.data),
          );
          toast.dismiss();
          toast.success("Result fetched successfully");
          return true;
        }
        break;
      }

      case 202: {
        toast.dismiss();
        toast(
          response.data.message ||
          "Result is being prepared. Please check again shortly.",
        );
        return false;
      }

      case 409: {
        toast.dismiss();
        toast.error(
          response.data.message || "This roll number is already in the queue.",
        );
        return false;
      }

      case 502: {
        toast.dismiss();
        toast.error("Upstream JNTUH servers are down. Try again later.");
        return false;
      }

      case 503: {
        toast.dismiss();
        toast.error("Server overloaded. Please try again later.");
        return false;
      }

      case 500: {
        toast.dismiss();
        toast.error("Unexpected server error occurred.");
        return false;
      }

      default: {
        toast.dismiss();
        toast.error("Unhandled response from server.");
        return false;
      }
    }

    toast.dismiss();
    return false;
  } catch (e: any) {
    toast.dismiss();

    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        toast.error("Request timed out. Try again later.");
      } else if (e.response) {
        toast.error(`Server error: ${e.response.status}`);
      } else {
        toast.error("Network issue. Please check your connection.");
      }
    } else {
      toast.error("Unexpected error occurred.");
    }

    return false;
  }
};
export const fetchBacklogReport = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getBacklogs?rollNumber=${htno}`;

    const response = await axios.get(url, { timeout: 20 * 1000 });
    if ("details" in response.data) {
      saveToLocalStorage(
        htno + "-Backlogreport",
        JSON.stringify(response.data),
      );
      return true;
    }
    if (response.data.status === "success") {
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.dismiss();
    toast.error("SERVER ISSUE!!");
    return false;
  }
};

export const fetchCreditsCheckerReport = async (htno: string) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getCreditsChecker?rollNumber=${htno}`;

    toast.loading("Result are been fetched");
    const response = await axios.get(url, { timeout: 20 * 1000 });
    if ("details" in response.data) {
      saveToLocalStorage(
        htno + "-CreditsCheckerreport",
        JSON.stringify(response.data),
      );
      toast.dismiss();
      return true;
    }
    if (response.data.status === "success") {
      toast.dismiss();
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.dismiss();
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.dismiss();
    toast.error("SERVER ISSUE!!");
  }
};

export const fetchCreditContrastReport = async (
  htno1: string,
  htno2: string,
) => {
  let response;
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getResultContrast?rollNumber1=${htno1}&rollNumber2=${htno2}`;

    toast.loading("Result are been fetched");
    response = await axios.get(url, { timeout: 20 * 1000 });
    if ("studentProfiles" in response.data) {
      saveToLocalStorage(
        htno1 + "-" + htno2 + "-CreditContrastreport",
        JSON.stringify(response.data),
      );
      return true;
    }
    if (response.data.status === "success") {
      toast.dismiss();
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.dismiss();
      toast.error(response.data.message);
    }

    return false;
  } catch (error: any) {
    toast.dismiss();
    if (error.response.status == 400) {
      toast.error(error.response.data.detail);
    } else {
      toast.error("SERVER ISSUE!!");
    }
  }
};

export type GraceMarksEligibility =
  | {
      kind: "eligible";
      totalBacklogs: number;
      semesters: any[];
      raw: Record<string, any>;
    }
  | { kind: "not_eligible"; message: string }
  | { kind: "rate_limited"; retryAfter: number; message: string }
  | { kind: "error"; message: string };

const parseRetryAfter = (value: string | null | undefined): number => {
  if (!value) return 0;
  const n = Number(value);
  if (Number.isFinite(n) && n > 0) return Math.ceil(n);
  return 0;
};

export const fetchGraceMarksEligibility = async (
  htno: string,
): Promise<GraceMarksEligibility> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/eligibility?rollNumber=${htno}`;

    const response = await axios.get(url, {
      timeout: 20 * 1000,
      validateStatus: () => true,
    });

    const body = response.data ?? {};

    if (response.status === 200) {
      if (typeof body.totalBacklogs === "number") {
        return {
          kind: "eligible",
          totalBacklogs: body.totalBacklogs,
          semesters: Array.isArray(body.semesters) ? body.semesters : [],
          raw: body,
        };
      }
      return {
        kind: "not_eligible",
        message: body.message || "You are not eligible for grace marks.",
      };
    }

    if (response.status === 404 || response.status === 406) {
      return {
        kind: "not_eligible",
        message: body.message || "You are not eligible for grace marks.",
      };
    }

    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many requests, please wait" +
            (retryAfter ? ` ${retryAfter} seconds.` : "."),
      };
    }

    return {
      kind: "error",
      message: body?.message || "Unable to check eligibility right now.",
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return { kind: "error", message: "Request timed out. Try again later." };
      }
      if (e.response) {
        return {
          kind: "error",
          message: `Server error: ${e.response.status}`,
        };
      }
      return { kind: "error", message: "Network issue. Please check your connection." };
    }
    return { kind: "error", message: "Unexpected error occurred." };
  }
};

export type GraceMarksUploadResult =
  | {
      kind: "success";
      rollNumber: string;
      downloadUrl: string;
      uploadedAt: string;
    }
  | { kind: "failure"; message: string; retriable: boolean }
  | { kind: "rate_limited"; retryAfter: number; message: string };

export const ACCEPTED_PROOF_MIME = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];
export const MAX_PROOF_SIZE_BYTES = 5 * 1024 * 1024;

export const validateProofFile = (file: File | null | undefined): string | null => {
  if (!file) return "Please choose a file to upload.";
  if (file.size === 0) return "Uploaded file is empty.";
  if (file.size > MAX_PROOF_SIZE_BYTES)
    return "File exceeds the 5MB upload limit.";
  if (!ACCEPTED_PROOF_MIME.includes(file.type))
    return "Only PDF or image (PNG/JPEG) uploads are accepted.";
  return null;
};

export const uploadGraceMarksProof = async (
  htno: string,
  file: File,
): Promise<GraceMarksUploadResult> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/proof?rollNumber=${htno}`;

    const form = new FormData();
    form.append("file", file);

    const response = await axios.post(url, form, {
      timeout: 60 * 1000,
      validateStatus: () => true,
    });

    const body = response.data ?? {};

    if (response.status === 200 && body?.status === "success") {
      return {
        kind: "success",
        rollNumber: body.rollNumber,
        downloadUrl: body.downloadUrl,
        uploadedAt: body.uploadedAt,
      };
    }

    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many uploads, please wait a minute" +
            (retryAfter ? ` (${retryAfter}s).` : "."),
      };
    }

    const retriable =
      response.status === 502 ||
      response.status === 500 ||
      response.status === 503;

    return {
      kind: "failure",
      message: body?.message || "Upload failed. Please try again.",
      retriable,
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return {
          kind: "failure",
          message: "Upload timed out. Please try again.",
          retriable: true,
        };
      }
      return {
        kind: "failure",
        message: "Network issue. Please check your connection.",
        retriable: true,
      };
    }
    return {
      kind: "failure",
      message: "Unexpected error occurred.",
      retriable: true,
    };
  }
};

export interface GraceMarksPendingProof {
  id: string;
  rollNumber: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  status: string;
  uploadedAt: string;
  updatedAt: string;
  downloadUrl: string;
}

export type GraceMarksPendingResult =
  | { kind: "ok"; count: number; proofs: GraceMarksPendingProof[] }
  | { kind: "unauthorized"; message: string }
  | { kind: "rate_limited"; retryAfter: number; message: string }
  | { kind: "error"; message: string };

export const fetchPendingProofs = async (
  adminKey: string,
): Promise<GraceMarksPendingResult> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/proofs/pending`;

    const response = await axios.get(url, {
      timeout: 20 * 1000,
      validateStatus: () => true,
      headers: { "X-Admin-Key": adminKey },
    });

    const body = response.data ?? {};

    if (response.status === 200) {
      return {
        kind: "ok",
        count: typeof body.count === "number" ? body.count : 0,
        proofs: Array.isArray(body.proofs) ? body.proofs : [],
      };
    }
    if (response.status === 401) {
      return {
        kind: "unauthorized",
        message: body?.message || "Invalid admin key.",
      };
    }
    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many requests, please wait" +
            (retryAfter ? ` ${retryAfter} seconds.` : "."),
      };
    }
    return {
      kind: "error",
      message: body?.message || `Server error: ${response.status}`,
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return { kind: "error", message: "Request timed out. Try again later." };
      }
      return { kind: "error", message: "Network issue. Please check your connection." };
    }
    return { kind: "error", message: "Unexpected error occurred." };
  }
};

export type GraceMarksProofDetailResult =
  | {
      kind: "ok";
      proof: GraceMarksPendingProof;
      backlogs: Record<string, any>;
    }
  | { kind: "unauthorized"; message: string }
  | { kind: "not_found"; message: string }
  | { kind: "rate_limited"; retryAfter: number; message: string }
  | { kind: "error"; message: string };

export const fetchProofDetail = async (
  proofId: string,
  adminKey: string,
): Promise<GraceMarksProofDetailResult> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/proofs/${encodeURIComponent(proofId)}`;

    const response = await axios.get(url, {
      timeout: 20 * 1000,
      validateStatus: () => true,
      headers: { "x-api-key": adminKey },
    });

    const body = response.data ?? {};

    if (response.status === 200) {
      const { backlogs, ...proof } = body as Record<string, any>;
      return {
        kind: "ok",
        proof: proof as GraceMarksPendingProof,
        backlogs: backlogs ?? {},
      };
    }
    if (response.status === 401) {
      const message =
        body?.detail?.message || body?.message || "Invalid admin key.";
      return { kind: "unauthorized", message };
    }
    if (response.status === 404) {
      return {
        kind: "not_found",
        message: body?.message || "Grace-marks proof not found.",
      };
    }
    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many requests, please wait" +
            (retryAfter ? ` ${retryAfter} seconds.` : "."),
      };
    }
    return {
      kind: "error",
      message: body?.message || `Server error: ${response.status}`,
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return { kind: "error", message: "Request timed out. Try again later." };
      }
      return { kind: "error", message: "Network issue. Please check your connection." };
    }
    return { kind: "error", message: "Unexpected error occurred." };
  }
};

export interface GraceMarkRowInput {
  subjectCode: string;
  semesterCode: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
}

export type GraceMarksInsertResult =
  | { kind: "ok"; rollNumber: string; inserted: number }
  | { kind: "bad_request"; message: string }
  | { kind: "unauthorized"; message: string }
  | { kind: "not_found"; message: string }
  | { kind: "rate_limited"; retryAfter: number; message: string }
  | { kind: "server_error"; message: string }
  | { kind: "error"; message: string };

export const submitGraceMarks = async (
  rollNumber: string,
  marks: GraceMarkRowInput[],
  adminKey: string,
): Promise<GraceMarksInsertResult> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/marks`;

    const response = await axios.post(
      url,
      { rollNumber, marks },
      {
        timeout: 30 * 1000,
        validateStatus: () => true,
        headers: {
          "x-api-key": adminKey,
          "content-type": "application/json",
        },
      },
    );

    const body = response.data ?? {};

    if (response.status === 200 && body?.status === "success") {
      return {
        kind: "ok",
        rollNumber: body.rollNumber,
        inserted: typeof body.inserted === "number" ? body.inserted : 0,
      };
    }
    if (response.status === 400) {
      return {
        kind: "bad_request",
        message: body?.message || "Invalid request.",
      };
    }
    if (response.status === 401) {
      const message =
        body?.detail?.message || body?.message || "Invalid admin key.";
      return { kind: "unauthorized", message };
    }
    if (response.status === 404) {
      return {
        kind: "not_found",
        message: body?.message || "Not found.",
      };
    }
    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many requests, please wait" +
            (retryAfter ? ` ${retryAfter} seconds.` : "."),
      };
    }
    if (response.status === 500) {
      return {
        kind: "server_error",
        message:
          body?.message || "Failed to record grace marks. Please try again.",
      };
    }
    return {
      kind: "error",
      message: body?.message || `Server error: ${response.status}`,
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return { kind: "error", message: "Request timed out. Try again later." };
      }
      return {
        kind: "error",
        message: "Network issue. Please check your connection.",
      };
    }
    return { kind: "error", message: "Unexpected error occurred." };
  }
};

export type GraceMarksProofStatus = "approved" | "rejected";

export type GraceMarksStatusUpdateResult =
  | {
      kind: "ok";
      id: string;
      rollNumber: string;
      newStatus: GraceMarksProofStatus;
      updatedAt: string;
    }
  | { kind: "unauthorized"; message: string }
  | { kind: "not_found"; message: string }
  | { kind: "invalid_status"; message: string }
  | { kind: "rate_limited"; retryAfter: number; message: string }
  | { kind: "server_error"; message: string }
  | { kind: "error"; message: string };

export const updateProofStatus = async (
  proofId: string,
  status: GraceMarksProofStatus,
  adminKey: string,
): Promise<GraceMarksStatusUpdateResult> => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/grace-marks/proofs/${encodeURIComponent(proofId)}/status`;

    const response = await axios.patch(
      url,
      { status },
      {
        timeout: 20 * 1000,
        validateStatus: () => true,
        headers: {
          "x-api-key": adminKey,
          "content-type": "application/json",
        },
      },
    );

    const body = response.data ?? {};

    if (response.status === 200 && body?.status === "success") {
      return {
        kind: "ok",
        id: body.id,
        rollNumber: body.rollNumber,
        newStatus: body.newStatus,
        updatedAt: body.updatedAt,
      };
    }
    if (response.status === 401) {
      const message =
        body?.detail?.message || body?.message || "Invalid admin key.";
      return { kind: "unauthorized", message };
    }
    if (response.status === 404) {
      return {
        kind: "not_found",
        message: body?.message || "Grace-marks proof not found.",
      };
    }
    if (response.status === 422) {
      const first = Array.isArray(body?.detail) ? body.detail[0] : null;
      return {
        kind: "invalid_status",
        message: first?.msg || "Invalid status value.",
      };
    }
    if (response.status === 429) {
      const retryAfter = parseRetryAfter(response.headers?.["retry-after"]);
      return {
        kind: "rate_limited",
        retryAfter,
        message:
          body?.message ||
          "Too many requests, please wait" +
            (retryAfter ? ` ${retryAfter} seconds.` : "."),
      };
    }
    if (response.status === 500) {
      return {
        kind: "server_error",
        message:
          body?.message || "Failed to update status. Please try again.",
      };
    }
    return {
      kind: "error",
      message: body?.message || `Server error: ${response.status}`,
    };
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        return { kind: "error", message: "Request timed out. Try again later." };
      }
      return {
        kind: "error",
        message: "Network issue. Please check your connection.",
      };
    }
    return { kind: "error", message: "Unexpected error occurred." };
  }
};

export const fetchNotifications = async (params: Params) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/notifications?page=${params.page}&degree=${params.degree}&regulation=${params.regulation}&title=${params.title}&year=${params.year}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      if (response.data.status === "success") {
        return null;
      }
      return response.data;
    } else {
      console.error(
        `Failed to fetch notifications. Status: ${response.status}`,
      );
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching notifications:", error);
    return null;
  }
};

export const fetchClassResult = async (
  htno: string,
  type: string = "academicresult",
) => {
  try {
    let url: string = process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";
    url = `${url}api/getClassResults?rollNumber=${htno}`;

    toast.loading("Result are been fetched");

    const response = await axios.get(url, { timeout: 20 * 1000 });

    if (response.data && response.data.length > 0) {
      saveToLocalStorage(
        htno + "-ClassResult-" + type,
        JSON.stringify(response.data),
      );
      toast.dismiss();
      return true;
    }

    if (response.data.status === "success") {
      toast.dismiss();
      toast(response.data.message);
    } else if (response.data.status === "failure") {
      toast.dismiss();
      toast.error(response.data.message);
    }

    return false;
  } catch {
    toast.dismiss();

    toast.error("SERVER ISSUE!!");
    return false;
  } finally {
    toast.dismiss();
  }
};
