"use server";

import { Member, MemberInfo } from "@/types/member";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

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
    .returns<Member[]>()
    .single();

  if (error) {
    throw error;
  }

  return data.id;
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

export async function fetchMember(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .returns<Member[]>();

  if (error) {
    throw error;
  }

  if (data.length === 0) {
    throw notFound();
  }

  return data[0];
}
