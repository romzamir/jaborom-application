import "./globals.css";
import { Rubik } from "next/font/google";
import type React from "react";
import { Toaster } from "react-hot-toast";
import { NavBar } from "@/components/nav-bar";
import { Providers } from "./providers";

const rubik = Rubik({ subsets: ["latin", "hebrew"] });

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
      <body className={rubik.className}>
        <Providers>
          <NavBar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
