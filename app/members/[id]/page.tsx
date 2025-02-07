import { notFound } from "next/navigation";
import Link from "next/link";
import MemberDetails from "@/components/MemberDetails";
import { mockMembers } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function MemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);
  const member = mockMembers.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">פרטי חבר</h1>
      <div className="flex justify-end mb-4">
        <Link href={`/members/${id}/edit`}>
          <Button>ערוך חבר</Button>
        </Link>
      </div>
      <MemberDetails member={member} />
    </div>
  );
}
