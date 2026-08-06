import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outputDirectory = new URL("../public/social/", import.meta.url);
mkdirSync(outputDirectory, { recursive: true });

const cards = [
  {
    file: "home",
    title: ["RESULTS.", "TOOLS.", "ONE PLACE."],
    kicker: "THE STUDENT DASHBOARD",
    chips: ["Results", "Credits", "Careers"],
    accent: "#d89a22",
    modules: ["RESULTS", "ACADEMICS", "OPPORTUNITIES"],
  },
  {
    file: "academic-result",
    title: ["SEMESTER", "RESULT", "CHECKER"],
    kicker: "MARKS TO CGPA",
    chips: ["Marks", "Grades", "SGPA"],
    accent: "#2d7891",
    modules: ["SUBJECTS", "CREDITS", "CGPA"],
  },
  {
    file: "all-results",
    title: ["EVERY", "SEMESTER.", "ONE VIEW."],
    kicker: "YOUR COMPLETE RECORD",
    chips: ["All attempts", "SGPA", "CGPA"],
    accent: "#6f7f3b",
    modules: ["SEMESTERS", "SUBJECTS", "OVERVIEW"],
  },
  {
    file: "backlog-report",
    title: ["KNOW YOUR", "BACKLOGS"],
    kicker: "PLAN WHAT COMES NEXT",
    chips: ["Subjects", "Status", "Clear plan"],
    accent: "#b35b35",
    modules: ["PENDING", "CLEARED", "SUMMARY"],
  },
  {
    file: "calendars",
    title: ["ACADEMIC", "CALENDARS"],
    kicker: "DATES THAT MATTER",
    chips: ["Course", "Regulation", "Year"],
    accent: "#6d5aa7",
    modules: ["SEMESTER", "EXAMS", "HOLIDAYS"],
  },
  {
    file: "channels",
    title: ["NEVER MISS", "AN UPDATE"],
    kicker: "JNTUH CONNECT CHANNELS",
    chips: ["WhatsApp", "Telegram", "Fast alerts"],
    accent: "#248a72",
    modules: ["RESULTS", "NOTICES", "ALERTS"],
  },
  {
    file: "class-result",
    title: ["CLASS RESULT", "ANALYSIS"],
    kicker: "THE BIGGER PICTURE",
    chips: ["Compare", "Rank", "Understand"],
    accent: "#476ca6",
    modules: ["STUDENTS", "SUBJECTS", "RANKS"],
  },
  {
    file: "credit-checker",
    title: ["CREDIT", "CHECKER"],
    kicker: "KNOW YOUR PROGRESS",
    chips: ["Secured", "Required", "Eligible"],
    accent: "#4d8754",
    modules: ["EARNED", "NEEDED", "STATUS"],
  },
  {
    file: "excel-results",
    title: ["RESULTS TO", "EXCEL"],
    kicker: "SAVE. SORT. ANALYSE.",
    chips: ["Clean export", "Spreadsheet", "Ready"],
    accent: "#28724c",
    modules: ["RESULTS", "COLUMNS", "DOWNLOAD"],
  },
  {
    file: "faq",
    title: ["QUICK", "ANSWERS"],
    kicker: "JNTUH CONNECT FAQ",
    chips: ["Results", "Privacy", "Tools"],
    accent: "#b47d2d",
    modules: ["SEARCH", "ANSWERS", "GUIDANCE"],
  },
  {
    file: "grace-marks",
    title: ["GRACE MARKS", "ELIGIBILITY"],
    kicker: "CHECK BEFORE YOU APPLY",
    chips: ["B.Tech", "B.Pharm", "Guided"],
    accent: "#9a563f",
    modules: ["DETAILS", "ELIGIBILITY", "PROOF"],
  },
  {
    file: "help-center",
    title: ["HELP", "CENTER"],
    kicker: "FIND THE RIGHT NEXT STEP",
    chips: ["Guides", "Support", "Report"],
    accent: "#397993",
    modules: ["HOW-TO", "SUPPORT", "RESOLVE"],
  },
  {
    file: "academic-journey",
    title: ["YOUR 4-YEAR", "JOURNEY"],
    kicker: "SEE HOW FAR YOU HAVE COME",
    chips: ["Trends", "Badges", "Goals"],
    accent: "#87569a",
    modules: ["SEMESTERS", "MILESTONES", "DREAM CGPA"],
  },
  {
    file: "mcp",
    title: ["JNTUH DATA", "FOR AI"],
    kicker: "MODEL CONTEXT PROTOCOL",
    chips: ["Connect", "Ask", "Explore"],
    accent: "#357585",
    modules: ["TOOLS", "CONTEXT", "ANSWERS"],
  },
  {
    file: "notifications",
    title: ["LATEST JNTUH", "NOTICES"],
    kicker: "EVERY UPDATE IN ONE PLACE",
    chips: ["Exams", "Academic", "University"],
    accent: "#b16132",
    modules: ["NEW", "IMPORTANT", "ARCHIVE"],
  },
  {
    file: "exam-notifications",
    title: ["EXAM", "NOTIFICATIONS"],
    kicker: "DATES. FEES. DETAILS.",
    chips: ["UG", "PG", "Official notices"],
    accent: "#a44b3f",
    modules: ["COURSE", "DEADLINE", "DETAILS"],
  },
  {
    file: "privacy",
    title: ["YOUR DATA.", "YOUR PRIVACY."],
    kicker: "CLEAR AND TRANSPARENT",
    chips: ["Minimal", "Secure", "Respectful"],
    accent: "#3e7181",
    modules: ["COLLECT", "PROTECT", "CONTROL"],
  },
  {
    file: "result-contrast",
    title: ["COMPARE", "RESULTS"],
    kicker: "SIDE BY SIDE",
    chips: ["Subjects", "SGPA", "CGPA"],
    accent: "#76549b",
    modules: ["STUDENT A", "STUDENT B", "INSIGHTS"],
  },
  {
    file: "syllabus",
    title: ["JNTUH", "SYLLABUS"],
    kicker: "FIND YOUR COURSE PLAN",
    chips: ["Program", "Branch", "Regulation"],
    accent: "#4f7754",
    modules: ["COURSES", "SUBJECTS", "DOWNLOADS"],
  },
  {
    file: "wrapped",
    title: ["YOUR YEAR.", "WRAPPED."],
    kicker: "AN ACADEMIC STORY",
    chips: ["Highlights", "Trends", "Share"],
    accent: "#a64f78",
    modules: ["MOMENTS", "PROGRESS", "STORY"],
  },
];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function socialCardSvg(card) {
  const titleFontSize = card.title.length === 3 ? 76 : 88;
  const titleStart = card.title.length === 3 ? 220 : 255;
  const titleLines = card.title
    .map(
      (line, index) =>
        `<text x="48" y="${titleStart + index * (titleFontSize + 2)}" class="headline" font-size="${titleFontSize}">${escapeXml(line)}</text>`,
    )
    .join("");
  const chips = card.chips
    .map((chip, index) => {
      const x = 48 + index * 150;
      return `<circle cx="${x}" cy="558" r="5" fill="${card.accent}"/><text x="${x + 14}" y="566" class="chip">${escapeXml(chip)}</text>`;
    })
    .join("");
  const modules = card.modules
    .map((module, index) => {
      const y = 126 + index * 151;
      const number = String(index + 1).padStart(2, "0");
      return `<g>
        <rect x="695" y="${y}" width="445" height="125" fill="#f8f5e8" stroke="#10201d" stroke-width="3"/>
        <rect x="695" y="${y}" width="96" height="125" fill="${card.accent}" fill-opacity="0.2"/>
        <text x="725" y="${y + 76}" class="number">${number}</text>
        <text x="824" y="${y + 48}" class="module">${escapeXml(module)}</text>
        <rect x="824" y="${y + 66}" width="240" height="9" fill="#10201d"/>
        <rect x="824" y="${y + 87}" width="175" height="8" fill="${card.accent}" fill-opacity="0.7"/>
        <circle cx="1098" cy="${y + 78}" r="18" fill="none" stroke="#10201d" stroke-width="3"/>
        <path d="M1089 ${y + 78}l7 7 13-16" fill="none" stroke="${card.accent}" stroke-width="5"/>
      </g>`;
    })
    .join("");
  const gridLines = [
    ...Array.from(
      { length: 42 },
      (_, index) =>
        `<line x1="${index * 28}" y1="0" x2="${index * 28}" y2="630"/>`,
    ),
    ...Array.from(
      { length: 24 },
      (_, index) =>
        `<line x1="0" y1="${index * 28}" x2="1200" y2="${index * 28}"/>`,
    ),
  ].join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <style>
        .brand,.headline,.kicker,.module,.number,.chip{font-family:'DejaVu Sans',Arial,sans-serif;fill:#10201d}
        .brand{font-weight:800;font-size:42px;letter-spacing:1px}.headline{font-weight:900;letter-spacing:-3px}
        .kicker{font-weight:800;font-size:19px;letter-spacing:3px}.module{font-weight:800;font-size:20px;letter-spacing:1px}
        .number{font-weight:900;font-size:27px}.chip{font-weight:700;font-size:18px}
      </style>
    </defs>
    <rect width="1200" height="630" fill="#f1f1db"/>
    <g stroke="#10201d" stroke-opacity="0.055" stroke-width="1">${gridLines}</g>
    <rect x="12" y="12" width="1176" height="606" fill="none" stroke="#10201d" stroke-width="9"/>
    <rect x="42" y="47" width="76" height="76" fill="#10201d"/>
    <text x="80" y="102" text-anchor="middle" font-family="'DejaVu Sans',Arial,sans-serif" font-size="42" font-weight="900" fill="#f1f1db">J</text>
    <text x="137" y="101" class="brand">JNTUH CONNECT</text>
    <line x1="42" y1="137" x2="620" y2="137" stroke="#10201d" stroke-width="2"/>
    <text x="48" y="178" class="kicker">${escapeXml(card.kicker)}</text>
    ${titleLines}
    <line x1="48" y1="526" x2="604" y2="526" stroke="#10201d" stroke-width="2"/>
    ${chips}
    <rect x="670" y="94" width="495" height="486" fill="#e8e8ce" fill-opacity="0.62" stroke="#10201d" stroke-width="3"/>
    ${modules}
    <path d="M640 156h30M640 277h30M640 428h30" stroke="#10201d" stroke-width="3" stroke-dasharray="4 5"/>
    <text x="1004" y="604" class="kicker" font-size="12">JNTUHCONNECT.DHETHI.COM</text>
  </svg>`;
}

const workDirectory = join(tmpdir(), "jntuh-social-images");
mkdirSync(workDirectory, { recursive: true });

for (const card of cards) {
  const svgPath = join(workDirectory, `${card.file}.svg`);
  const jpgPath = new URL(`${card.file}.jpg`, outputDirectory);
  writeFileSync(svgPath, socialCardSvg(card));
  execFileSync("magick", [
    "-background",
    "#f1f1db",
    svgPath,
    "-strip",
    "-interlace",
    "Plane",
    "-sampling-factor",
    "4:2:0",
    "-quality",
    "86",
    jpgPath.pathname,
  ]);
}

execFileSync("magick", [
  new URL("../public/careers-og.png", import.meta.url).pathname,
  "-strip",
  "-interlace",
  "Plane",
  "-sampling-factor",
  "4:2:0",
  "-quality",
  "88",
  new URL("careers.jpg", outputDirectory).pathname,
]);

rmSync(workDirectory, { recursive: true, force: true });
console.log(`Generated ${cards.length + 1} optimized social images.`);
