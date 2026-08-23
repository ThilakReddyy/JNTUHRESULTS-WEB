import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider/theme-provider";
import Navbar from "@/components/navbar/navbar";
import SideMenubar from "@/components/sidemenubar/sidemenubar";
import { SidebarProvider } from "@/customhooks/sidebarhook";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import WebVitals from "@/components/analytics/WebVitals";
import { NavBarProvider } from "@/customhooks/navbarhook";
import NotificationPopUp from "@/components/notifications/popup";
import {
  createPageMetadata,
  pageMetadataDefinitions,
} from "@/lib/page-metadata";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";

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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "JNTUH Connect",
    statusBarStyle: "default",
  },
  verification: {
    google: "0STTwkOucWr-pQpKmDmE6lqQHDvHaNaR7GzFNLxkMTg",
  },
};

const siteOrigin = siteUrl.origin;
const organizationId = `${siteOrigin}/#organization`;

const mobileApp = (
  id: string,
  operatingSystem: string,
  storeUrl: string,
) => ({
  "@type": "MobileApplication",
  "@id": `${siteOrigin}/#${id}`,
  name: "JNTUH Connect",
  operatingSystem,
  applicationCategory: "EducationalApplication",
  description: siteDescription,
  url: storeUrl,
  installUrl: storeUrl,
  downloadUrl: storeUrl,
  publisher: { "@id": organizationId },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "JNTUH Connect",
      url: `${siteOrigin}/`,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/icon-512x512.png`,
        width: 512,
        height: 512,
      },
      // Tells Google the website and both store listings are the same entity.
      sameAs: [PLAY_STORE_URL, APP_STORE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: "JNTUH Connect",
      url: `${siteOrigin}/`,
      description: siteDescription,
      publisher: { "@id": organizationId },
    },
    mobileApp("android-app", "Android", PLAY_STORE_URL),
    mobileApp("ios-app", "iOS", APP_STORE_URL),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics />
        <WebVitals />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
