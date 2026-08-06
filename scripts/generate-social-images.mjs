import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import {
  Archive,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BookMarked,
  BookOpenText,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Database,
  Download,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  FileWarning,
  GitCompare,
  GraduationCap,
  HelpCircle,
  Home,
  Layers3,
  LifeBuoy,
  LineChart,
  ListChecks,
  LockKeyhole,
  Medal,
  Megaphone,
  MessagesSquare,
  Network,
  PanelTop,
  RadioTower,
  Route,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wand2,
} from "lucide-react";

const outputDirectory = new URL("../public/social/", import.meta.url);
mkdirSync(outputDirectory, { recursive: true });

const paperTexture = `data:image/jpeg;base64,${readFileSync(
  new URL("../public/social-paper-texture.jpg", import.meta.url),
).toString("base64")}`;

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

const ink = "#10201d";

const pageIconByFile = {
  home: Home,
  "academic-result": GraduationCap,
  "all-results": Layers3,
  "backlog-report": ListChecks,
  calendars: CalendarDays,
  channels: MessagesSquare,
  "class-result": BarChart3,
  "credit-checker": BadgeCheck,
  "excel-results": FileSpreadsheet,
  faq: HelpCircle,
  "grace-marks": Sparkles,
  "help-center": LifeBuoy,
  "academic-journey": Route,
  mcp: Bot,
  notifications: BellRing,
  "exam-notifications": ClipboardList,
  privacy: ShieldCheck,
  "result-contrast": GitCompare,
  syllabus: BookOpenText,
  wrapped: Trophy,
};

const moduleIconByName = {
  RESULTS: FileCheck2,
  ACADEMICS: GraduationCap,
  OPPORTUNITIES: Trophy,
  SUBJECTS: BookOpenText,
  CREDITS: BadgeCheck,
  CGPA: TrendingUp,
  SEMESTERS: Layers3,
  OVERVIEW: PanelTop,
  PENDING: FileWarning,
  CLEARED: CheckCircle2,
  SUMMARY: ClipboardList,
  SEMESTER: CalendarClock,
  EXAMS: CalendarCheck,
  HOLIDAYS: CalendarDays,
  NOTICES: Megaphone,
  ALERTS: BellRing,
  STUDENTS: Users,
  RANKS: Medal,
  EARNED: BadgeCheck,
  NEEDED: Target,
  STATUS: UserCheck,
  COLUMNS: Table2,
  DOWNLOAD: Download,
  SEARCH: Search,
  ANSWERS: HelpCircle,
  GUIDANCE: Route,
  DETAILS: FileText,
  ELIGIBILITY: UserCheck,
  PROOF: FileCheck2,
  "HOW-TO": BookMarked,
  SUPPORT: LifeBuoy,
  RESOLVE: Wand2,
  MILESTONES: Trophy,
  "DREAM CGPA": Target,
  TOOLS: BrainCircuit,
  CONTEXT: Network,
  NEW: Sparkles,
  IMPORTANT: BellRing,
  ARCHIVE: Archive,
  COLLECT: Database,
  PROTECT: LockKeyhole,
  CONTROL: ShieldCheck,
  "STUDENT A": UserCheck,
  "STUDENT B": UserCheck,
  INSIGHTS: LineChart,
  COURSES: GraduationCap,
  DOWNLOADS: Download,
  MOMENTS: Sparkles,
  PROGRESS: TrendingUp,
  STORY: Share2,
  COURSE: GraduationCap,
  DEADLINE: CalendarClock,
};

function renderIcon(Icon, x, y, size, color = ink, strokeWidth = 2.25) {
  const svg = renderToStaticMarkup(
    createElement(Icon, {
      "aria-hidden": true,
    }),
  );
  const contents = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>"));
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${contents}</g>`;
}

function socialCardSvg(card) {
  const longestLine = Math.max(...card.title.map((line) => line.length));
  const titleFontSize =
    longestLine >= 14 ? 68 : longestLine >= 11 ? 74 : 82;
  const titleStart = card.title.length === 3 ? 238 : 272;
  const titleLines = card.title
    .map(
      (line, index) =>
        `<text x="44" y="${titleStart + index * (titleFontSize - 2)}" class="headline" font-size="${titleFontSize}">${escapeXml(line)}</text>`,
    )
    .join("");
  const chips = card.chips
    .map((chip, index) => {
      const x = 46 + index * 152;
      return `<circle cx="${x}" cy="535" r="5" fill="${card.accent}"/><text x="${x + 14}" y="542" class="chip">${escapeXml(chip)}</text>`;
    })
    .join("");
  const modules = card.modules
    .map((module, index) => {
      const y = 92 + index * 146;
      const Icon = moduleIconByName[module] ?? pageIconByFile[card.file];
      return `<g>
        <rect x="681" y="${y}" width="463" height="132" fill="#f8f5e8" fill-opacity="0.86" stroke="${ink}" stroke-width="3"/>
        <rect x="681" y="${y}" width="126" height="132" fill="${card.accent}" fill-opacity="0.12" stroke="${ink}" stroke-width="3"/>
        ${renderIcon(Icon, 716, y + 34, 62)}
        <path d="M827 ${y}v31h20l-10-8-10 8z" fill="${card.accent}"/>
        <text x="861" y="${y + 42}" class="module">${escapeXml(module)}</text>
        <rect x="849" y="${y + 56}" width="172" height="13" fill="${ink}"/>
        <rect x="849" y="${y + 82}" width="132" height="9" fill="#98a16c"/>
        <rect x="849" y="${y + 103}" width="14" height="8" fill="${card.accent}"/>
        <rect x="870" y="${y + 103}" width="14" height="8" fill="${card.accent}"/>
        <rect x="891" y="${y + 103}" width="14" height="8" fill="${card.accent}"/>
        <line x1="1046" y1="${y + 1}" x2="1046" y2="${y + 131}" stroke="${ink}" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="1095" cy="${y + 66}" r="25" fill="none" stroke="${ink}" stroke-width="3"/>
        ${renderIcon(ArrowRight, 1078, y + 49, 34, ink, 2.6)}
      </g>`;
    })
    .join("");
  const pageIcon = pageIconByFile[card.file];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <style>
        .brand,.kicker,.module,.chip{font-family:'DejaVu Sans',Arial,sans-serif;fill:${ink}}
        .headline{font-family:'DejaVu Sans Condensed','Arial Narrow',sans-serif;fill:${ink};font-weight:900;letter-spacing:-2px}
        .brand{font-weight:900;font-size:41px;letter-spacing:-1px}.kicker{font-weight:800;font-size:17px;letter-spacing:3px}
        .module{font-weight:900;font-size:18px;letter-spacing:1px}.chip{font-weight:700;font-size:17px}
      </style>
    </defs>
    <rect width="1200" height="630" fill="#f1f0d7"/>
    <image href="${paperTexture}" width="1200" height="630" preserveAspectRatio="xMidYMid slice" opacity="0.72"/>
    <rect x="11" y="11" width="1178" height="608" fill="none" stroke="${ink}" stroke-width="9"/>
    <rect x="41" y="42" width="505" height="82" fill="#f8f5e8" fill-opacity="0.55" stroke="${ink}" stroke-width="3"/>
    <rect x="41" y="42" width="84" height="82" fill="${ink}"/>
    ${renderIcon(GraduationCap, 56, 58, 54, "#f1f0d7", 2.15)}
    <text x="145" y="98" class="brand">JNTUH CONNECT</text>
    <line x1="41" y1="138" x2="546" y2="138" stroke="${ink}" stroke-width="2"/>
    <text x="44" y="174" class="kicker">${escapeXml(card.kicker)}</text>
    ${titleLines}
    <line x1="44" y1="503" x2="500" y2="503" stroke="${ink}" stroke-width="2"/>
    ${chips}
    <path d="M649 157h31M649 303h31M649 449h31" stroke="${ink}" stroke-width="2" stroke-dasharray="4 5"/>
    <path d="M649 157v292" stroke="${ink}" stroke-width="2" stroke-dasharray="4 5"/>
    ${modules}
    <g transform="translate(603 486)">
      <circle cx="0" cy="0" r="54" fill="#f1f0d7" stroke="${ink}" stroke-width="4"/>
      <circle cx="0" cy="0" r="43" fill="none" stroke="${ink}" stroke-width="2" stroke-dasharray="3 4"/>
      ${renderIcon(pageIcon, -27, -27, 54, card.accent, 2.5)}
    </g>
    <g fill="${ink}" opacity="0.9">
      ${Array.from({ length: 9 }, (_, index) => `<circle cx="${47 + index * 13}" cy="582" r="2"/>`).join("")}
      ${Array.from({ length: 9 }, (_, index) => `<circle cx="${47 + index * 13}" cy="594" r="2"/>`).join("")}
    </g>
    <path d="M790 575h120m14 0h220M790 586h125m10 0h219M790 597h120m15 0h219" stroke="${ink}" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.75"/>
    <text x="1140" y="604" text-anchor="end" class="kicker" font-size="11">JNTUHCONNECT.DHETHI.COM</text>
  </svg>`;
}

for (const card of cards) {
  const jpgPath = new URL(`${card.file}.jpg`, outputDirectory);
  await sharp(Buffer.from(socialCardSvg(card)))
    .jpeg({ quality: 86, progressive: true, chromaSubsampling: "4:2:0" })
    .toFile(fileURLToPath(jpgPath));
}

await sharp(fileURLToPath(new URL("../public/careers-og.png", import.meta.url)))
  .jpeg({ quality: 88, progressive: true, chromaSubsampling: "4:2:0" })
  .toFile(fileURLToPath(new URL("careers.jpg", outputDirectory)));

console.log(`Generated ${cards.length + 1} optimized social images.`);
