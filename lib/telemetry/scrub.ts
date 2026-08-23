/**
 * Redaction helper shared by the logger and error boundaries. See
 * CLAUDE.md/SECURITY.md: never put hall-ticket numbers, marks, proof
 * documents, subscriptions, or admin values into logs/analytics.
 */

const REDACTED = "[REDACTED]";

const SENSITIVE_KEYS = new Set([
  "htno",
  "hallticket",
  "hallticketno",
  "rollnumber",
  "rollno",
  "marks",
  "sgpa",
  "cgpa",
  "subjects",
  "name",
  "studentname",
  "proof",
  "proofurl",
  "subscription",
  "adminkey",
  "apikey",
  "token",
]);

// Roll numbers are 10 alphanumeric characters (see Form validation / backend
// utils.helpers.validateRollNo). Over-redacting an unrelated 10-char token is
// an acceptable cost; missing a real roll number in a log/error message isn't.
const ROLL_NUMBER_RE = /\b[0-9A-Za-z]{10}\b/g;

export function scrubText(value: string): string {
  if (!value) return value;
  return value.replace(ROLL_NUMBER_RE, REDACTED);
}

export function scrubValue(value: unknown): unknown {
  if (typeof value === "string") return scrubText(value);
  if (Array.isArray(value)) return value.map(scrubValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key,
        SENSITIVE_KEYS.has(key.toLowerCase()) ? REDACTED : scrubValue(val),
      ]),
    );
  }
  return value;
}
