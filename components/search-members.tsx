"use client";

import { useState } from "react";
import ms from "ms";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { gradeToHebrewName } from "@/utils/grade";
import { Card, CardContent } from "@/components/ui/card";
import { fetchMembersServer } from "@/utils/members/supabase";

export default function SearchMembers() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: members, isLoading: isQueryLoading } = useQuery({
    queryKey: ["search-members", debouncedSearchTerm],
    queryFn: () => fetchMembersServer(debouncedSearchTerm),
    staleTime: ms("1m"),
  });

  const isLoading = isQueryLoading || searchTerm !== debouncedSearchTerm;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor="search">חיפוש חניך</Label>
            <div className="flex mt-1">
              <Input
                id="search"
                type="text"
                placeholder="הקלד שם פרטי או שם משפחה"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="mr-2">
                חפש
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">
            {searchTerm ? "תוצאות חיפוש" : "רשימת חניכים"}
          </h2>
          <ul className="space-y-2">
            {isLoading && <span>בטעינה...</span>}
            {members?.map((member) => (
              <li
                key={member.id}
                className="p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Link href={`/members/${member.id}`} className="block">
                  <p className="font-semibold">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    כיתה {gradeToHebrewName(member.grade)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
