import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

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
