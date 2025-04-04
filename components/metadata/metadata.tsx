"use client";
import { usePathname } from "next/navigation";

import React from "react";

const MetaData = () => {
  const pathname = usePathname();
  return (
    <>
      <meta property="og:url" content="https://jntuhresults.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="JNTUH Results" />
      <meta
        property="og:description"
        content="You can find the Results of your entire semesters here of Jawaharlal Nehru Technological University, Hyderabad (JNTUH)."
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/ThilakReddyy/JNTUHRESULTS-WEB/main/public/FrontPage.png"
      />
      <meta
        property="keywords"
        content="jntuh, jntuh Results, jntuh vercel, vercel jntuh, jntuh results vercel,  jntuhresults, jntuh notifications, JNTUH Results Engineering, JNTUH Engineering Results, jntuh bpharmacy results, jntuh bphar results, jntuh mtech results, jntuh mba results, jntuh mca results, jntuh all semester results"
      />
      <meta name="publisher" content="Thilak Reddy" />
      <meta name="creator" content="Thilak Reddy" />
      <meta name="author" content="Thilak Reddy" />
      <meta name="twitter:card" content="summary" />
      <meta
        property="twitter:title"
        content="JNTUH Results - Check Your UG and PG Exam Results Online"
      />
      <meta
        property="twitter:description"
        content="JNTUH Results, JNTUH results vercel, jntuh vercel, vercel jntuh, verceljntuh, jntuhresults, jntuh notifications,  jntuh bpharmacy results, jntuh bphar results, jntuh mtech results, jntuh mba results, jntuh mca results, jntuh all semester results, jntuh all semester results r18"
      />
      {/* <meta */}
      {/*   name="description" */}
      {/*   content="Easily access your JNTUH results for {relevant course and semester} - Find out your grades, CGPA, backlogs, Jobs, Internships and more in one place. Check now!" */}
      {/* /> */}
      <meta
        name="google-site-verification"
        content="2arj9D99oUuGh03Qhewo_iEY45zbwhrJqLytiZSmoEg"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="canonical"
        href={`https://jntuhresults.vercel.app${pathname}`}
      />

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5512897194230969"
        crossOrigin="anonymous"
      ></script>
      <link
        href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Inter:wght@300&family=Roboto+Slab&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default MetaData;
