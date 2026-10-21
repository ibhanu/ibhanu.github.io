import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bhanu Pratap | Senior Flutter & Mobile Engineer",
  description:
    "Developer portfolio of Bhanu Pratap, Senior Flutter Engineer in Bengaluru. Tech Lead at BigBang.Social (500K+ downloads, $5M+ annual volume), Senior Flutter Developer at Under 25 (400K+ users, $20M+ earnings), and author of open-source apps Aura, Mango, and Sarvam AI mobile SDKs.",
  keywords: [
    "Bhanu Pratap",
    "Senior Flutter Engineer",
    "Mobile Developer Portfolio",
    "BigBang.Social",
    "Under 25",
    "Aura Flutter App",
    "Mango Flutter App",
    "Sarvam AI Mobile SDK",
    "Bengaluru Mobile Engineer",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#07080B] text-[#F4F0EA] font-sans">
        {children}
      </body>
    </html>
  );
}
