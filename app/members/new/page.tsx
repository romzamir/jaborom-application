import MemberForm from "@/components/member-form";

export default function NewMemberPage() {
  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">הוספת חבר חדש</h1>
      <MemberForm />
    </div>
  );
}
