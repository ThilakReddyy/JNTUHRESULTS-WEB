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
import MobileAppGate from "@/components/download/mobile-app-gate";
import {
  createPageMetadata,
  pageMetadataDefinitions,
} from "@/lib/page-metadata";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = new URL("https://jntuhconnect.dhethi.com");
const siteDescription = pageMetadataDefinitions.home.description;
const homeMetadata = createPageMetadata("home");

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: siteUrl,
  applicationName: "JNTUH Connect",
  title: {
    default: pageMetadataDefinitions.home.title,
    template: "%s | JNTUH Connect",
  },
  authors: [{ name: "Thilak Reddy" }],
  creator: "Thilak Reddy",
  publisher: "JNTUH Connect",
  manifest: "/manifest.json",
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

const mobileGateBootstrapScript = `
  (() => {
    const exemptRoutes = ["/gracemarks", "/helpcenter", "/faq"];
    const path = window.location.pathname;
    const isExempt = exemptRoutes.some(
      (route) => path === route || path.startsWith(route + "/")
    );

    if (isExempt) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isIOS = /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAndroid || isIOS) {
      document.documentElement.classList.add(
        "mobile-app-gated",
        isAndroid ? "mobile-platform-android" : "mobile-platform-ios"
      );
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: mobileGateBootstrapScript }} />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
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
