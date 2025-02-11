"use server";

import { createClient } from "@/utils/supabase/server";

export type Member = {
  id: number;
  firstName: string;
  lastName: string;
  grade: number;
};

export async function fetchMembersServer(searchTerm?: string) {
  const supabase = await createClient();

  let query = supabase.from("members").select("id, firstName, lastName, grade");

  if (searchTerm) {
    query = query.or(
      `firstName.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`
    );
  }

  const { data: members, error } = await query.returns<Member[]>();

  return { members, error };
}
