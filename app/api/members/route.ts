import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: members, error } = await supabase
    .from("members")
    .select("id, firstName, lastName, city, grade");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const data = await request.json();
  const { data: newMember, error } = await supabase
    .from("members")
    .insert([data])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newMember[0], { status: 201 });
}
