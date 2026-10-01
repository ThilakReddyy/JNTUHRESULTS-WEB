import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import FaqActions from "@/components/seo/faq-actions";
import { studentFaqs } from "@/lib/student-faqs";
import { SITE_URL, OFFICIAL_RESULTS_URL } from "@/lib/site";

export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        "@id": `${SITE_URL}/faq#webpage`, url: `${SITE_URL}/faq`,
        name: "JNTUH results and student tools: frequently asked questions",
        isPartOf: { "@id": `${SITE_URL}/#website` }, inLanguage: "en-IN",
        mainEntity: studentFaqs.map(({ question, answer }) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
        ],
      }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="underline">Home</Link> / FAQ
      </nav>
      <h1 className="text-3xl font-extrabold tracking-tight">JNTUH results: frequently asked questions</h1>
      <p className="my-5 text-muted-foreground leading-relaxed">
        Answers about semester results, supplementary attempts, backlogs and credits on JNTUH Connect.
        For original marks and grades, consult the <a href={OFFICIAL_RESULTS_URL} className="underline">official JNTUH results portal</a>.
      </p>
      <div className="space-y-3">
        {studentFaqs.map(({ question, answer, href, label }, index) => (
          <details key={question} open={index === 0} className="group rounded-xl border border-border bg-card p-4">
            <summary className="cursor-pointer font-semibold">{question}</summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{answer}</p>
            <Link href={href} className="mt-3 inline-block text-sm underline underline-offset-4">{label}</Link>
          </details>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Maintained by Thilak Reddy. <Link href="/helpcenter" className="underline">Report a problem</Link> or read our <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
      <FaqActions />
    </div>
  );
}
