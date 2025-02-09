import { notFound } from "next/navigation";
import MemberForm from "@/components/member-form";
import { supabase } from "@/utils/supabase";

export default async function EditMemberPage({
  params,
}: {
  params: { id: string };
}) {
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
      <MemberForm initialData={member} />
    </div>
  );
}
