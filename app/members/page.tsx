import SearchMembers from "@/components/search-members";

export default function SearchPage() {
  return (
    <div className="container mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        חיפוש חניכים
      </h1>
      <SearchMembers />
    </div>
  );
}
