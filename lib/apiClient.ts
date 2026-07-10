import axios from "axios";

// Backend header guard: every request to the results backend must carry this
// header or it is rejected with 403. The value must match the backend's
// API_ACCESS_KEY env var. Import this module (for its side effect) in any
// file that calls the backend with axios; use API_KEY/API_KEY_HEADER
// directly for raw fetch() calls.
export const API_KEY_HEADER = "X-Api-Key";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

axios.interceptors.request.use((config) => {
  if (API_KEY && axios.getUri(config).startsWith(BACKEND_URL)) {
    config.headers.set(API_KEY_HEADER, API_KEY);
  }
  return config;
});
