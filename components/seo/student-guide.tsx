import Link from "next/link";
import { studentFaqs } from "@/lib/student-faqs";
import { OFFICIAL_RESULTS_URL } from "@/lib/site";

const topics = {
  home: { heading: "How to check JNTUH results and academic progress", questions: [1, 2, 3] },
  academicResult: { heading: "How to read your JNTUH semester results", questions: [1, 4, 6] },
  allResults: { heading: "Regular and supplementary JNTUH results", questions: [2, 6] },
  backlogReport: { heading: "Understanding your JNTUH backlog report", questions: [3, 6] },
  creditChecker: { heading: "Understanding earned credits and promotion", questions: [5, 4] },
} as const;

export default function StudentGuide({ topic }: { topic: keyof typeof topics }) {
  const { heading, questions } = topics[topic];
  return (
    <section aria-labelledby={`guide-${topic}`} className="mx-auto my-10 w-full max-w-4xl px-4 sm:px-6">
      <h2 id={`guide-${topic}`} className="text-2xl font-bold tracking-tight">{heading}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {questions.map((index) => {
          const faq = studentFaqs[index];
          return <div key={faq.question}>
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            <Link href={faq.href} className="mt-2 inline-block text-sm underline underline-offset-4">{faq.label}</Link>
          </div>;
        })}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        JNTUH Connect is an independent student project. Verify marks and grades on the{" "}
        <a href={OFFICIAL_RESULTS_URL} className="underline">official JNTUH results portal</a>.
        {" "}<Link href="/faq" className="underline">More questions and answers</Link>
      </p>
    </section>
  );
}
