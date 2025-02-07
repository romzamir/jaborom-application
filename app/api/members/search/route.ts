import { NextResponse } from "next/server";
import { mockMembers } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term) {
    const simplifiedMembers = mockMembers.map(
      ({ id, firstName, lastName, city }) => ({
        id,
        firstName,
        lastName,
        city,
      })
    );
    return NextResponse.json(simplifiedMembers);
  }

  const results = mockMembers.filter(
    (member) =>
      member.firstName.includes(term) || member.lastName.includes(term)
  );

  const simplifiedResults = results.map(
    ({ id, firstName, lastName, city }) => ({
      id,
      firstName,
      lastName,
      city,
    })
  );

  return NextResponse.json(simplifiedResults);
}
