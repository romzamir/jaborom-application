"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  const showNavBar = !pathname.startsWith("/auth");

  if (!showNavBar) return null;

  return (
    <nav className="bg-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          ז'בורום
        </Link>
        <div className="space-x-4 rtl:space-x-reverse">
          <Link href="/" className="hover:underline">
            דף הבית
          </Link>
          <Link href="/members" className="hover:underline">
            חיפוש חניכים
          </Link>
          <Link href="/members/new" className="hover:underline">
            הוספת חניך חדש
          </Link>
        </div>
      </div>
    </nav>
  );
}
