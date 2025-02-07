"use client";

import { useEffect } from "react";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      router.replace("/auth/login");
    })();
  }, []);

  return null;
}
