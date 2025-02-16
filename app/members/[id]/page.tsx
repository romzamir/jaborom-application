"use client";

import { notFound } from "next/navigation";
import Link from "next/link";

import MemberDetails, {
  MemberDetailsSkeleton,
} from "@/components/member-details";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchMember } from "@/utils/members/supabase";

const MAX_FETCH_TRIES = 3;

export default function MemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const { data: member, isLoading } = useQuery({
    queryKey: ["member", params.id],
    queryFn: () => fetchMember(id),
    retry: (count, error) => {
      return count < MAX_FETCH_TRIES && error.message !== "NEXT_NOT_FOUND";
    },
  });

  if (!member && !isLoading) {
    return notFound();
  }

  const isDisabled = isLoading || !member;

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        פרטי חבר
      </h1>
      <div className="flex justify-end mb-4">
        <Button disabled={isDisabled} className="disabled:pointer-events-none">
          <Link href={`/members/${id}/edit`}>ערוך חבר</Link>
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
