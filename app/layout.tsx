import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { NavBar } from "@/components/nav-bar";
import { Providers } from "./providers";

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
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
