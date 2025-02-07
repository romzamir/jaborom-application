"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export function NavBar() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;

  return (
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
  );
}
