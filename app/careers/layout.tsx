import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Internships and Fresher Jobs",
  description:
    "Discover India-eligible engineering internships and fresher jobs from product and service companies, refreshed every 24 hours.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Engineering Internships and Fresher Jobs | JNTUH Connect",
    description:
      "Verified early-career engineering opportunities from official company career pages.",
    url: "/careers",
    images: [
      {
        url: "/careers-og.png",
        width: 1200,
        height: 630,
        alt: "Engineering jobs for freshers on JNTUH Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Internships and Fresher Jobs | JNTUH Connect",
    description:
      "Verified early-career engineering opportunities from official company career pages.",
    images: ["/careers-og.png"],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
