import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        ברוכים הבאים לג'אבורום
      </h1>
      <p className="text-xl mb-8 text-center">
        מערכת ניהול חברים לתנועת הנוער שלך
      </p>
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <Link href="/members/new">
          <Button>הוספת חבר חדש</Button>
        </Link>
        <Link href="/members">
          <Button variant="outline">חיפוש חברים</Button>
        </Link>
      </div>
    </div>
  );
}
