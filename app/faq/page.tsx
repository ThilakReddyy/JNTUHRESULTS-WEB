"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does this website work?",
    answer:
      "When a user enters their roll number, the website asynchronously sends requests to the JNTUH server, retrieving the results for all regular and supplementary exams across all semesters. Using BeautifulSoup, the backend parses the HTML content to extract result information. An algorithm then combines the results and calculates the CGPA. This entire process is optimised to complete in under 2 seconds.",
  },
  {
    question: "Was the entire code written by you?",
    answer:
      "The entire backend logic has been developed by Thilak Reddy along with hemanth-kotagiri and syed ansar. You are welcome to use the code by following the GNU General Public License. Feel free to reach out if you have any questions.",
  },
  {
    question: "How do I access my grades for all semesters?",
    answer:
      "Enter your roll number on the Academic Result page and click \"Results\". All your semester results will be displayed in one view.",
  },
  {
    question: "What is the purpose of the backend?",
    answer:
      "The backend fetches and parses results for individual students and entire classes. It makes requests to the JNTUH website and uses BeautifulSoup to extract the required data and serve it to the frontend.",
  },
  {
    question: "How does the backend fetch results from JNTUH?",
    answer:
      "Since JNTUH doesn't provide a public API, the backend sends requests to the JNTUH website and parses the HTML response using BeautifulSoup, a Python library for HTML parsing.",
  },
  {
    question: "What technologies power this website?",
    answer:
      "The frontend is built with Next.js (React) and hosted on Vercel. The backend uses Python with BeautifulSoup for parsing and is served from the edge for fast response times.",
  },
  {
    question: "How can I report a bug or get help?",
    answer:
      "Contact the developer at thilakreddypothuganti@gmail.com, fill in the Google Form linked in the Help Center, or open an issue on the GitHub repository. Pull requests with fixes are also welcome.",
  },
  {
    question: "What API endpoints are available?",
    answer:
      "/api/academicresult?htno=Roll_no — fetches results for a single student.\n/api/classresult?htnos=comma_separated_htnos&semester=semester_code — fetches results for multiple students.",
  },
  {
    question: "Can I suggest new features?",
    answer:
      "Yes! Message the developer with your ideas for tools or features you'd like to see on the platform.",
  },
  {
    question: "How can I report backend issues?",
    answer:
      "Contact the developer via email for backend setup or deployment issues. You can also open a GitHub issue or submit a pull request to the dev branch.",
  },
];

const socialLinks = [
  { href: "https://github.com/thilakreddyy", Icon: FaGithub },
  { href: "https://twitter.com/thilakreddyonly", Icon: FaTwitter },
  { href: "https://www.instagram.com/__thilak_reddy__/", Icon: FaInstagram },
];

const Faq = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  const clearCache = () => {
    localStorage.clear();
    toast.success("Cache cleared!");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-2xl lg:text-3xl tracking-tight text-[#0b3954] dark:text-sky-300 uppercase">
          FAQ
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 tracking-widest uppercase">
          Frequently Asked Questions
        </p>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-2 mb-8">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`rounded-2xl border overflow-hidden transition-all ${open === i
                ? "border-[#0b3954] dark:border-sky-600"
                : "border-gray-200 dark:border-white/10"
              }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.07] transition-colors"
            >
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                size={16}
                className={`flex-shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open === i ? "rotate-180" : ""
                  }`}
              />
            </button>

            {open === i && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-white/[0.03] border-t border-gray-100 dark:border-white/5">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear cache */}
      <div className="flex justify-center mb-8">
        <button
          onClick={clearCache}
          className="text-xs font-semibold px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-red-300 hover:text-red-500 dark:hover:border-red-800 dark:hover:text-red-400 transition-colors"
        >
          Clear Cache
        </button>
      </div>

      {/* Social links */}
      <div className="flex justify-center gap-5 text-gray-400 dark:text-gray-500">
        {socialLinks.map(({ href, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-3">
        © 2024 jntuhresults.vercel.app
      </p>
    </div>
  );
};

export default Faq;
