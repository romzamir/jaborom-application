"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import MemberDetails, {
  MemberDetailsSkeleton,
} from "@/components/member-details";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchMember } from "@/utils/members/supabase";

export default function MemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const { data: member, isLoading } = useQuery({
    queryKey: ["member", params.id],
    queryFn: () => fetchMember(id),
  });

  if (!member && !isLoading) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        פרטי חבר
      </h1>
      <div className="flex justify-end mb-4">
        <Link href={`/members/${id}/edit`}>
          <Button>ערוך חבר</Button>
        </Link>
      </div>
      {isLoading || !member ? (
        <MemberDetailsSkeleton />
      ) : (
        <MemberDetails member={member} />
      )}
    </div>
  );
}
