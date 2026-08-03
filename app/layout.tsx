import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider/theme-provider";
import Navbar from "@/components/navbar/navbar";
import SideMenubar from "@/components/sidemenubar/sidemenubar";
import { SidebarProvider } from "@/customhooks/sidebarhook";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { NavBarProvider } from "@/customhooks/navbarhook";
import NotificationPopUp from "@/components/notifications/popup";
import MobileAppGate from "@/components/download/mobile-app-gate";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = new URL("https://jntuhconnect.dhethi.com");
const siteDescription =
  "Check JNTUH UG and PG exam results, academic performance, backlogs, credits, notifications, syllabi, and academic calendars in one place.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "JNTUH Connect",
  title: {
    default: "JNTUH Connect - Check UG & PG Exam Results Online",
    template: "%s | JNTUH Connect",
  },
  description: siteDescription,
  authors: [{ name: "Thilak Reddy" }],
  creator: "Thilak Reddy",
  publisher: "JNTUH Connect",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "JNTUH Connect",
    title: "JNTUH Connect - Check UG & PG Exam Results Online",
    description: siteDescription,
    images: [
      {
        url: "/FrontPage.png",
        width: 1200,
        height: 630,
        alt: "JNTUH Connect exam results portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JNTUH Connect - Check UG & PG Exam Results Online",
    description: siteDescription,
    images: ["/FrontPage.png"],
  },
  verification: {
    google: "0STTwkOucWr-pQpKmDmE6lqQHDvHaNaR7GzFNLxkMTg",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JNTUH Connect",
  url: siteUrl.toString(),
  description: siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics />
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MobileAppGate>
            <SidebarProvider>
              <NavBarProvider>
                <Navbar />
                <main className="min-h-screen pt-16">
                  <SideMenubar />
                  <div className="min-h-[calc(100vh-4rem)] lg:ml-64">
                    <NotificationPopUp />
                    {/* <Pwa /> */}
                    {children}
                  </div>
                  <div className=" md:block">
                    <Toaster position="bottom-right" reverseOrder={false} />
                  </div>
                </main>
              </NavBarProvider>
            </SidebarProvider>
          </MobileAppGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
