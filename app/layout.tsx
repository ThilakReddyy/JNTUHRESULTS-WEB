import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider/theme-provider";
import Navbar from "@/components/navbar/navbar";
import SideMenubar from "@/components/sidemenubar/sidemenubar";
import { SidebarProvider } from "@/customhooks/sidebarhook";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaData from "@/components/metadata/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JNTUH RESULTS",
  description: "Access your overall results of Jntuh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <MetaData />
      </head>
      <GoogleAnalytics />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Navbar />
            <main className="pt-16">
              <SideMenubar />
              <div className="lg:ml-64">{children}</div>
              <div className=" md:block">
                <Toaster position="bottom-right" reverseOrder={false} />
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
