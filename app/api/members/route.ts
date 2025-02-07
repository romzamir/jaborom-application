import { NextResponse } from "next/server";
import { mockMembers } from "@/lib/mockData";

export async function GET() {
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

export async function POST(request: Request) {
  const data = await request.json();
  const newMember = {
    id: mockMembers.length + 1,
    ...data,
  };
  mockMembers.push(newMember);
  return NextResponse.json(newMember, { status: 201 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  const index = mockMembers.findIndex((member) => member.id === data.id);
  if (index === -1) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }
  mockMembers[index] = { ...mockMembers[index], ...data };
  return NextResponse.json(mockMembers[index]);
}
