import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ג'אבורום - ניהול חברים",
  description: "מערכת לניהול חברים בתנועת נוער",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
