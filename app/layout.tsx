import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/data/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="app-root min-h-full flex flex-col bg-bg text-text font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
