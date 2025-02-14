"use server";

import { Member, MemberInfo } from "@/types/member";
import { createClient } from "@/utils/supabase/server";

export async function fetchMembersServer(searchTerm?: string) {
  const supabase = await createClient();

  let query = supabase.from("members").select("id, firstName, lastName, grade");

  if (searchTerm) {
    query = query.or(
      `firstName.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`
    );
  }

  const { data: members, error } = await query.returns<MemberInfo[]>();

  if (error) {
    throw error;
  }

  return members.map((value) => MemberInfo.parse(value));
}

export async function createMember(
  member: Omit<Member, "id">
): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .insert(member)
    .select()
    .returns<Member[]>();

  if (error) {
    throw error;
  }

  return data[0].id;
}

export async function saveMember(member: Member) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("members")
    .update(member)
    .eq("id", member.id)
    .select();

  if (error) {
    throw error;
  }
}
