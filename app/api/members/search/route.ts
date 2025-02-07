import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  let query = supabase
    .from("members")
    .select("id, firstName, lastName, address, grade");

  if (term) {
    query = query.or(`firstName.ilike.%${term}%,lastName.ilike.%${term}%`);
  }

  const { data: members, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(members);
}
