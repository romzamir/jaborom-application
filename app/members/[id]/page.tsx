import { notFound } from "next/navigation";
import Link from "next/link";
import MemberDetails from "@/components/member-details";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";

export default async function MemberPage({
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
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        פרטי חבר
      </h1>
      <div className="flex justify-end mb-4">
        <Link href={`/members/${id}/edit`}>
          <Button>ערוך חבר</Button>
        </Link>
      </div>
      <MemberDetails member={member} />
    </div>
  );
}
