import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET() {
  const { data: members, error } = await supabase
    .from("members")
    .select("id, firstName, lastName, city, grade");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(members);
}

export async function POST(request: Request) {
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
