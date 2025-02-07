import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";

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
          <nav className="bg-background p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                ג'אבורום
              </Link>
              <div className="space-x-4 rtl:space-x-reverse">
                <Link href="/" className="hover:underline">
                  דף הבית
                </Link>
                <Link href="/members/search" className="hover:underline">
                  חיפוש חברים
                </Link>
                <Link href="/members/new" className="hover:underline">
                  הוספת חבר חדש
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
