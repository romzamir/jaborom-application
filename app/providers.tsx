"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@radix-ui/react-direction";

import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient({});

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <DirectionProvider dir="rtl">{children}</DirectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
