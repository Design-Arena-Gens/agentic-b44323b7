"use client";

import { ProjectProvider } from "@/contexts/ProjectContext";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
