import { NextResponse } from "next/server";
import { mockMembers } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number.parseInt(params.id);
  const member = mockMembers.find((m) => m.id === id);

  if (!member) {
    return new NextResponse("Member not found", { status: 404 });
  }

  return NextResponse.json(member);
}
