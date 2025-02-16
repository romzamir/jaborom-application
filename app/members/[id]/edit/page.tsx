"use client";

import { notFound } from "next/navigation";
import MemberForm from "@/components/member-form";
import { Member } from "@/types/member";
import { useMember } from "@/hooks/use-member";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditMemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);

  const { data: member, isLoading } = useMember(id);

  if (!member && !isLoading) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">עריכת חבר</h1>
      {isLoading ? (
        <Skeleton className="w-24 h-64 min-w-full min-h-full" />
      ) : (
        <MemberForm initialData={Member.parse(member)} />
      )}
    </div>
  );
}
