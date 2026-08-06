import axios from "axios";

import { BACKEND_URL } from "@/lib/apiClient";

export type JobType = "INTERN" | "FULL_TIME" | "PART_TIME";
export type CompanyType = "PRODUCT" | "SERVICE" | "OTHER";

export interface JobRecord {
  id: string;
  title: string;
  description: string;
  company: string;
  companyCanonical: string | null;
  companyType: CompanyType;
  isProductBased: boolean;
  isFresher: boolean;
  companyLogo: string | null;
  type: JobType;
  experience: string | null;
  experienceMin: number | null;
  experienceMax: number | null;
  salary: string | null;
  tags: string[];
  applicationUrl: string | null;
  isRemote: boolean;
  eligibilityScope: "INDIA_ONSITE" | "INDIA_REMOTE" | "GLOBAL_REMOTE" | null;
  postedAt: string | null;
  source: string;
  locations: string[];
}

export interface JobsResponse {
  page: number;
  pageSize: number;
  count: number;
  hasMore: boolean;
  jobs: JobRecord[];
}

export interface JobsQuery {
  page: number;
  pageSize?: number;
  type?: JobType | "";
  keyword?: string;
  company?: string;
  companyType?: CompanyType | "";
  remote?: boolean;
}

const jobsEndpoint = new URL("api/jobs", BACKEND_URL).toString();

export async function getJobs(query: JobsQuery, signal?: AbortSignal) {
  const response = await axios.get<JobsResponse>(jobsEndpoint, {
    params: query,
    signal,
  });
  return response.data;
}

