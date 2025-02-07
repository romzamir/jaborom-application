import SearchMembers from "@/components/SearchMembers";

export default function SearchPage() {
  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">חיפוש חברים</h1>
      <SearchMembers />
    </div>
  );
}
