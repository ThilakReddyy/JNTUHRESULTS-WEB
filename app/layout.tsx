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
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
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
