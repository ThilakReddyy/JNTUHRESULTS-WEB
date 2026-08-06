import type { Metadata } from "next";

type PageMetadataDefinition = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  noIndex?: boolean;
};

export const pageMetadataDefinitions = {
  home: {
    title: "JNTUH Results and Student Tools",
    description:
      "Check JNTUH results, grades, CGPA, backlogs, credits, notifications, syllabi, calendars, and student opportunities in one place.",
    path: "/",
    image: "home",
    imageAlt: "JNTUH Connect results and student tools",
    keywords: ["JNTUH results", "JNTUH student tools", "JNTUH Connect"],
  },
  academicResult: {
    title: "JNTUH Semester Result Checker",
    description:
      "Check semester-wise JNTUH subject marks, grades, credits, SGPA, and CGPA securely using your hall ticket number.",
    path: "/academicresult",
    image: "academic-result",
    imageAlt: "JNTUH semester result checker",
    keywords: ["JNTUH result", "semester results", "SGPA", "CGPA"],
  },
  allResults: {
    title: "All JNTUH Academic Results",
    description:
      "View every available JNTUH semester result together, including subjects, grades, credits, SGPA, and overall CGPA.",
    path: "/academicallresult",
    image: "all-results",
    imageAlt: "All JNTUH academic results in one view",
    keywords: ["JNTUH all results", "academic results", "semester results"],
  },
  backlogReport: {
    title: "JNTUH Backlog Report",
    description:
      "Find uncleared JNTUH subjects across semesters and understand your current backlog status in one clear report.",
    path: "/backlogreport",
    image: "backlog-report",
    imageAlt: "JNTUH backlog report and subject status",
    keywords: ["JNTUH backlogs", "backlog report", "failed subjects"],
  },
  calendars: {
    title: "JNTUH Academic Calendars",
    description:
      "Browse current JNTUH academic calendars by course, regulation, and academic year, all in one convenient place.",
    path: "/calendars",
    image: "calendars",
    imageAlt: "JNTUH academic calendars",
    keywords: ["JNTUH calendar", "academic calendar", "semester schedule"],
  },
  careers: {
    title: "Engineering Internships and Fresher Jobs",
    description:
      "Discover India-eligible engineering internships and fresher jobs from product and service companies, refreshed every 24 hours.",
    path: "/careers",
    image: "careers",
    imageAlt: "Engineering internships and fresher jobs on JNTUH Connect",
    keywords: [
      "engineering internships",
      "fresher jobs",
      "graduate jobs India",
    ],
  },
  channels: {
    title: "JNTUH WhatsApp and Telegram Updates",
    description:
      "Join the JNTUH Connect WhatsApp and Telegram channels for timely result, examination, and university updates.",
    path: "/channels",
    image: "channels",
    imageAlt: "JNTUH Connect WhatsApp and Telegram update channels",
    keywords: ["JNTUH WhatsApp", "JNTUH Telegram", "JNTUH updates"],
  },
  classResult: {
    title: "JNTUH Class Result Analysis",
    description:
      "Compare subject results and academic performance across students in a JNTUH class with a clear class-level report.",
    path: "/classresult",
    image: "class-result",
    imageAlt: "JNTUH class result analysis",
    keywords: ["JNTUH class results", "class analysis", "student ranking"],
  },
  creditChecker: {
    title: "JNTUH Credit Checker",
    description:
      "Check your secured JNTUH credits and understand the credits required for academic promotion under your regulation.",
    path: "/creditchecker",
    image: "credit-checker",
    imageAlt: "JNTUH secured credits and promotion checker",
    keywords: ["JNTUH credits", "credit checker", "promotion eligibility"],
  },
  excelResult: {
    title: "Export JNTUH Results to Excel",
    description:
      "Turn supported JNTUH academic results into a clean Excel spreadsheet for saving, sorting, and further analysis.",
    path: "/excelresult",
    image: "excel-results",
    imageAlt: "Export JNTUH academic results to Excel",
    keywords: ["JNTUH Excel results", "export results", "marks spreadsheet"],
  },
  faq: {
    title: "JNTUH Connect FAQs",
    description:
      "Find clear answers to common questions about JNTUH Connect, result data, privacy, and the available student tools.",
    path: "/faq",
    image: "faq",
    imageAlt: "Frequently asked questions about JNTUH Connect",
    keywords: ["JNTUH FAQ", "JNTUH Connect help", "result questions"],
  },
  graceMarks: {
    title: "JNTUH Grace Marks Eligibility",
    description:
      "Check JNTUH B.Tech and B.Pharm grace marks eligibility and submit supporting proof through a guided process.",
    path: "/gracemarks",
    image: "grace-marks",
    imageAlt: "JNTUH grace marks eligibility checker",
    keywords: [
      "JNTUH grace marks",
      "grace marks eligibility",
      "B.Tech results",
    ],
  },
  helpCenter: {
    title: "JNTUH Connect Help Center",
    description:
      "Get guidance for JNTUH Connect tools, troubleshoot common issues, and find the right way to report a problem.",
    path: "/helpcenter",
    image: "help-center",
    imageAlt: "JNTUH Connect help center",
    keywords: ["JNTUH help", "JNTUH Connect support", "result support"],
  },
  journey: {
    title: "Your JNTUH Academic Journey",
    description:
      "Explore your four-year JNTUH story through SGPA trends, milestones, semester insights, and a CGPA goal simulator.",
    path: "/journey",
    image: "academic-journey",
    imageAlt: "Your four-year JNTUH academic journey",
    keywords: ["JNTUH academic journey", "SGPA trend", "CGPA simulator"],
  },
  mcp: {
    title: "JNTUH Connect for AI Tools",
    description:
      "Connect supported AI assistants to JNTUH Connect through MCP and ask questions about available academic information.",
    path: "/mcp",
    image: "mcp",
    imageAlt: "Connect AI tools to JNTUH Connect using MCP",
    keywords: ["JNTUH MCP", "JNTUH AI", "Model Context Protocol"],
  },
  notifications: {
    title: "Latest JNTUH Notifications",
    description:
      "Browse the latest JNTUH examination, academic, timetable, and university notifications from one organized page.",
    path: "/notifications",
    image: "notifications",
    imageAlt: "Latest JNTUH examination and university notifications",
    keywords: ["JNTUH notifications", "exam notifications", "JNTUH updates"],
  },
  examNotification: {
    title: "JNTUH Exam Notification Details",
    description:
      "View examination notification details for JNTUH B.Tech, B.Pharmacy, M.Tech, M.Pharmacy, MBA, and MCA courses.",
    path: "/notifications/examcode",
    image: "exam-notifications",
    imageAlt: "JNTUH examination notification details",
    keywords: [
      "JNTUH exam notification",
      "exam fee notification",
      "exam dates",
    ],
  },
  privacy: {
    title: "JNTUH Connect Privacy Policy",
    description:
      "Understand what information JNTUH Connect processes, why it is used, and the safeguards designed to protect students.",
    path: "/privacy",
    image: "privacy",
    imageAlt: "JNTUH Connect privacy and student data protection",
    keywords: ["JNTUH Connect privacy", "student data", "privacy policy"],
  },
  resultContrast: {
    title: "Compare JNTUH Academic Results",
    description:
      "Compare JNTUH academic performance side by side to understand semester, subject, grade, and CGPA differences.",
    path: "/resultcontrast",
    image: "result-contrast",
    imageAlt: "Compare two JNTUH academic results",
    keywords: ["compare JNTUH results", "result contrast", "CGPA comparison"],
  },
  syllabus: {
    title: "JNTUH Syllabus by Regulation",
    description:
      "Find JNTUH course syllabi organized by program, regulation, branch, and academic year for quick access.",
    path: "/syllabus",
    image: "syllabus",
    imageAlt: "JNTUH syllabus organized by course and regulation",
    keywords: ["JNTUH syllabus", "JNTUH regulation", "course syllabus"],
  },
  wrapped: {
    title: "JNTUH Academic Year Wrapped",
    description:
      "Turn your JNTUH results into a personalized academic-year story with highlights, trends, and shareable insights.",
    path: "/wrapped",
    image: "wrapped",
    imageAlt: "Your personalized JNTUH academic year wrapped",
    keywords: ["JNTUH wrapped", "academic year story", "result highlights"],
  },
} satisfies Record<string, PageMetadataDefinition>;

export type PageMetadataKey = keyof typeof pageMetadataDefinitions;

export function createPageMetadata(
  key: PageMetadataKey,
  options: { noIndex?: boolean; title?: string; path?: string } = {},
): Metadata {
  const page = pageMetadataDefinitions[key];
  const title = options.title ?? page.title;
  const path = options.path ?? page.path;
  const image = `/social/${page.image}.jpg`;
  const noIndex = options.noIndex ?? false;
  const socialTitle = `${title} | JNTUH Connect`;

  return {
    title,
    description: page.description,
    keywords: [...page.keywords, "JNTUH Connect"],
    alternates: noIndex ? undefined : { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "JNTUH Connect",
      title: socialTitle,
      description: page.description,
      url: path,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [{ url: image, alt: page.imageAlt }],
    },
  };
}
