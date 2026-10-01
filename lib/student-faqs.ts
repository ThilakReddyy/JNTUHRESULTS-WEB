export const studentFaqs = [
  {
    question: "Is JNTUH Connect an official JNTUH website?",
    answer: "JNTUH Connect is an independent student project for Jawaharlal Nehru Technological University, Hyderabad students. It is not affiliated with or endorsed by the university. Results are sourced from public university result pages; confirm academic decisions with official university or college records.",
    href: "https://jntuh.ac.in/", label: "Official JNTUH website",
  },
  {
    question: "How do I check my JNTUH semester results?",
    answer: "Open Academic Result, enter your 10-character hall ticket number, and select Result. The page displays available semester results, subject grades, credits, SGPA and CGPA. Availability depends on the results published by JNTUH and the service being able to retrieve them.",
    href: "/academicresult", label: "Check semester results",
  },
  {
    question: "Where can I see regular and supplementary attempts?",
    answer: "Use All Academic Results to review available regular and supplementary exam attempts for your hall ticket number. Use Academic Result for the consolidated semester view. A newly published or revised result may not appear immediately.",
    href: "/academicallresult", label: "View all available attempts",
  },
  {
    question: "How can I check my pending JNTUH backlogs?",
    answer: "Enter your hall ticket number in Backlog Report to review subjects identified as uncleared in the available results. If you recently passed a supplementary exam or received a revised result, verify that update against the official result before relying on the report.",
    href: "/backlogreport", label: "Check pending backlogs",
  },
  {
    question: "What is the difference between SGPA and CGPA?",
    answer: "SGPA means Semester Grade Point Average and summarizes one semester. CGPA means Cumulative Grade Point Average and summarizes academic performance across semesters. Grade points are weighted by course credits; included subjects and treatment of repeat attempts depend on your academic regulation.",
    href: "/academicresult", label: "View SGPA and CGPA",
  },
  {
    question: "Does the credit checker confirm promotion eligibility?",
    answer: "The credit checker summarizes earned credits from available results. Promotion requirements depend on your program, regulation, year and applicable university notices. Confirm eligibility with your college examination branch and the relevant JNTUH notification.",
    href: "/creditchecker", label: "Review earned credits",
  },
  {
    question: "What should I do if my result is missing or looks incorrect?",
    answer: "Check that your hall ticket number is correct and that JNTUH has published the result. Compare it with the official result portal and retry later if the service is unavailable. Report a mismatch through the Help Center. JNTUH Connect cannot change university records.",
    href: "/helpcenter", label: "Get help with results",
  },
  {
    question: "Where can I find JNTUH syllabi and academic calendars?",
    answer: "Use the Syllabus page to choose your program, regulation and branch. The Academic Calendars page links to schedules by course and academic year. Check the linked university document for the applicable dates or syllabus and any subsequent revisions.",
    href: "/syllabus", label: "Browse JNTUH syllabi",
  },
] as const;
