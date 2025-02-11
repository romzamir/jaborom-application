"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { gradeToHebrewName } from "@/utils/grade";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  grade: number;
}

export default function SearchMembers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);

  const fetchMembers = async (term?: string) => {
    const url = new URL(`/api/members`, window.location.origin);
    if (term) {
      url.searchParams.append("term", term);
    }

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("אירעה שגיאה בטעינת החברים");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMembers(searchTerm);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <Label htmlFor="search">חיפוש חבר</Label>
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
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">
            {searchTerm ? "תוצאות חיפוש" : "רשימת חברים"}
          </h2>
          <ul className="space-y-2">
            {searchResults.map((member) => (
              <li
                key={member.id}
                className="p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Link href={`/members/${member.id}`} className="block">
                  <p className="font-semibold">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    {member.city} | כיתה {gradeToHebrewName(member.grade)}
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
