"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { mockMembers, gradeToHebrewName } from "@/lib/mockData";

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

  useEffect(() => {
    // Initialize with all members
    setSearchResults(
      mockMembers.map(({ id, firstName, lastName, city, grade }) => ({
        id,
        firstName,
        lastName,
        city,
        grade,
      }))
    );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = mockMembers.filter(
      (member) =>
        member.firstName.includes(searchTerm) ||
        member.lastName.includes(searchTerm)
    );
    setSearchResults(
      results.map(({ id, firstName, lastName, city, grade }) => ({
        id,
        firstName,
        lastName,
        city,
        grade,
      }))
    );
  };

  return (
    <div className="space-y-6">
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

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {searchTerm ? "תוצאות חיפוש" : "רשימת חברים"}
        </h2>
        <ul className="space-y-2">
          {searchResults.map((member) => (
            <li
              key={member.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Link href={`/members/${member.id}`} className="block">
                <p className="font-semibold">
                  {member.firstName} {member.lastName}
                </p>
                <p className="text-gray-600">
                  {member.city} | כיתה {gradeToHebrewName(member.grade)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
