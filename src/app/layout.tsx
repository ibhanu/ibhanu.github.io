import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bhanu Pratap | Senior Mobile & Systems Architect",
  description:
    "Portfolio of Bhanu Pratap, Senior Mobile & Systems Architect in Bengaluru. Tech Lead at BigBang.Social (500K+ downloads, $5M+ annual volume), Senior Flutter Developer at Under 25 (400K+ users, $20M+ volume), and author of Sarvam AI Indic voice SDKs.",
  keywords: [
    "Bhanu Pratap",
    "Senior Mobile Architect",
    "Flutter Tech Lead",
    "BigBang.Social",
    "Under 25",
    "Sarvam AI Mobile SDK",
    "Bengaluru Systems Engineer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} antialiased`}
    >
      <body className="min-h-[100dvh] bg-[#0A0A0D] text-[#F5F5F7] font-sans">
        {children}
      </body>
    </html>
  );
}
