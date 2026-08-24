import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  CircleOff,
  Contrast,
  CreditCard,
  FileCheck,
  GraduationCap,
  HelpCircle,
  Layers,
  PlugZap,
  Radio,
  Route,
  School,
  Sparkles,
} from "lucide-react";

export type HomeTool = {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  /** Rendered as a corner tag on the tool card. */
  badge?: string;
  /** Opens outside the application. */
  external?: boolean;
};

export type HomeToolGroup = {
  id: string;
  label: string;
  caption: string;
  tools: HomeTool[];
};

export const homeToolGroups: HomeToolGroup[] = [
  {
    id: "results",
    label: "Results & performance",
    caption: "Everything a hall ticket number can tell you.",
    tools: [
      {
        title: "Academic Result",
        description:
          "Semester-by-semester subjects, grades, credits, SGPA and CGPA from one hall ticket number.",
        link: "/academicresult",
        icon: GraduationCap,
        badge: "Most used",
      },
      {
        title: "All Results",
        description:
          "Every regular and supplementary attempt on record, merged into a single view.",
        link: "/academicallresult",
        icon: Layers,
      },
      {
        title: "Backlog Report",
        description:
          "Your complete backlog list with the attempts and marks behind each pending subject.",
        link: "/backlogreport",
        icon: CircleOff,
      },
      {
        title: "Credits Checker",
        description:
          "See the credits you have earned and how many more you need to promote or graduate.",
        link: "/creditchecker",
        icon: CreditCard,
      },
      {
        title: "Class Result",
        description:
          "Pull up your whole class from one hall ticket and see where you stand.",
        link: "/classresult",
        icon: School,
      },
      {
        title: "Result Contrast",
        description:
          "Compare two hall ticket numbers subject by subject across every semester.",
        link: "/resultcontrast",
        icon: Contrast,
      },
      {
        title: "Grace Marks",
        description:
          "Check whether you are eligible for an existing grace-marks update before you apply.",
        link: "/gracemarks",
        icon: FileCheck,
      },
      {
        title: "Academic Journey",
        description:
          "Your four years plotted end to end — semester trends, recoveries and turning points.",
        link: "/journey",
        icon: Route,
      },
      {
        title: "JNTUH Wrapped",
        description:
          "A year-in-review of your academics: best subject, toughest semester, and the numbers behind them.",
        link: "/wrapped",
        icon: Sparkles,
        badge: "Fun",
      },
    ],
  },
  {
    id: "academics",
    label: "Coursework",
    caption: "The reference material you keep hunting for.",
    tools: [
      {
        title: "Syllabus",
        description:
          "Subject-wise syllabus for every regulation, branch and academic year.",
        link: "/syllabus",
        icon: BookOpen,
      },
      {
        title: "Academic Calendars",
        description:
          "All JNTUH academic calendars, segregated by year and regulation, in one place.",
        link: "/calendars",
        icon: CalendarDays,
      },
      {
        title: "Important Questions",
        description:
          "Frequently repeated questions collected semester-wise to focus your revision.",
        link: "https://jntuh-iq.vercel.app/",
        icon: HelpCircle,
        external: true,
      },
    ],
  },
  {
    id: "updates",
    label: "Updates & beyond",
    caption: "Stay ahead of the university, and of the job market.",
    tools: [
      {
        title: "Notifications",
        description:
          "Every JNTUH circular and result announcement, filtered and searchable.",
        link: "/notifications",
        icon: Bell,
      },
      {
        title: "Channels",
        description:
          "Join the Telegram and WhatsApp channels for instant alerts the moment results drop.",
        link: "/channels",
        icon: Radio,
      },
      {
        title: "Jobs & Careers",
        description:
          "Internships, off-campus drives and fresher roles worth your time.",
        link: "/careers",
        icon: Briefcase,
      },
      {
        title: "Connect via MCP",
        description:
          "Plug JNTUH Connect into Claude or any MCP client and ask for results in plain language.",
        link: "/mcp",
        icon: PlugZap,
        badge: "New",
      },
      {
        title: "Help Center",
        description:
          "Something broken or missing? Report it and it gets fixed.",
        link: "/helpcenter",
        icon: HelpCircle,
      },
    ],
  },
];

/** Flat catalogue, kept for callers that only need the list of destinations. */
export const homeLinks: HomeTool[] = homeToolGroups.flatMap(
  (group) => group.tools,
);

export const homeToolCount = homeLinks.length;
