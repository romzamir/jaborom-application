"use client";

import { ComponentType, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@radix-ui/react-direction";

import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient({});

type ProviderEntry<T = any> = [ComponentType<T>, T];
const providersToRender: ProviderEntry[] = [
  [
    QueryClientProvider,
    {
      client: queryClient,
    },
  ],
  [
    ThemeProvider,
    { attribute: "class", defaultTheme: "dark", enableSystem: true },
  ],
  [
    DirectionProvider,
    {
      dir: "rtl",
    },
  ],
];

export function Providers({ children }: PropsWithChildren) {
  const wrapWithNext = (index: number) => {
    if (index === providersToRender.length) {
      return <>{children}</>;
    }

    const [CurrentProvider, props] = providersToRender[index];

    return (
      <CurrentProvider {...props}>{wrapWithNext(index + 1)}</CurrentProvider>
    );
  };

  return wrapWithNext(0);
}
