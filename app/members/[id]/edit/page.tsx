import { notFound } from "next/navigation";
import MemberForm from "@/components/MemberForm";
import { mockMembers } from "@/lib/mockData";

export default function EditMemberPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id);
  const member = mockMembers.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">עריכת חבר</h1>
      <MemberForm initialData={member} />
    </div>
  );
}
