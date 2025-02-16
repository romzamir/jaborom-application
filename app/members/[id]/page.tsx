"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import MemberDetails, {
  MemberDetailsSkeleton,
} from "@/components/member-details";
import { Button } from "@/components/ui/button";
import { useMember } from "@/hooks/use-member";

export default function MemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const { data: member, isLoading } = useMember(id);

  if (!member && !isLoading) {
    return notFound();
  }

  const isDisabled = isLoading || !member;

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        פרטי חניך
      </h1>
      <div className="flex justify-end mb-4">
        <Button disabled={isDisabled} className="disabled:pointer-events-none">
          <Link href={`/members/${id}/edit`}>ערוך חניך</Link>
        </Button>
      </div>
      {isDisabled ? (
        <MemberDetailsSkeleton />
      ) : (
        <MemberDetails member={member} />
      )}
    </div>
  );
}
