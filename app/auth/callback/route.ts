import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.error();
  }

  const { data, error: authError } = await supabase.auth.exchangeCodeForSession(
    code
  );

  const nextUrl = new URL("/", url.origin);
  return NextResponse.redirect(nextUrl);
}
