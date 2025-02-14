import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MemberForm from "@/components/member-form";
import { Member } from "@/types/member";

export default async function EditMemberPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const id = Number.parseInt(params.id);
  const { data: member, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !member) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">עריכת חבר</h1>
      <MemberForm initialData={Member.parse(member)} />
    </div>
  );
}
