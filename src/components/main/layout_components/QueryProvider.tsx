"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient";

interface QueryProviderWrapperProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
