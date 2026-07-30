"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/AuthContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthProvider>{children}</AuthProvider>
    </I18nProvider>
  );
}
