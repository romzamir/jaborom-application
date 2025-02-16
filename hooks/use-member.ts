import { fetchMember } from "@/utils/members/supabase";
import { useQuery } from "@tanstack/react-query";

const MAX_FETCH_TRIES = 3;

export function useMember(id: number) {
  return useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
    retry: (count, error) => {
      return count < MAX_FETCH_TRIES && error.message !== "NEXT_NOT_FOUND";
    },
  });
}
