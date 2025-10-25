"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type CalculationMode = "on-grid" | "off-grid" | "pumping";

export type ProjectInputs = {
  name: string;
  client: string;
  location: string;
  mode: CalculationMode;
  peakPowerKw: number;
  dailyConsumptionKwh: number;
  irradiance: number;
  storageCapacityKwh: number;
  investment: number;
  tariff: number;
  horizonYears: number;
};

export type ProjectResult = {
  production: number;
  coverageRate: number;
  savings: number;
  roi: number;
  paybackMonths: number;
  co2Offset: number;
};

export type Project = {
  id: string;
  createdAt: string;
  updatedAt: string;
  inputs: ProjectInputs;
  result: ProjectResult;
};

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => Project;
  updateProject: (projectId: string, data: Partial<Project>) => void;
  removeProject: (projectId: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

const defaultProjects: Project[] = [
  {
    id: "demo-on-grid",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    inputs: {
      name: "Centre logistique Lyon",
      client: "LogisFrance",
      location: "Lyon, France",
      mode: "on-grid",
      peakPowerKw: 120,
      dailyConsumptionKwh: 680,
      irradiance: 4.2,
      storageCapacityKwh: 45,
      investment: 185_000,
      tariff: 0.18,
      horizonYears: 15,
    },
    result: {
      production: 168_200,
      coverageRate: 72,
      savings: 41_200,
      roi: 18,
      paybackMonths: 58,
      co2Offset: 92,
    },
  },
  {
    id: "demo-pompage",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    inputs: {
      name: "Station pompage Sahel",
      client: "AquaFarm",
      location: "Saint-Louis, Sénégal",
      mode: "pumping",
      peakPowerKw: 45,
      dailyConsumptionKwh: 210,
      irradiance: 5.8,
      storageCapacityKwh: 30,
      investment: 86_000,
      tariff: 0.11,
      horizonYears: 12,
    },
    result: {
      production: 89_700,
      coverageRate: 95,
      savings: 22_400,
      roi: 24,
      paybackMonths: 44,
      co2Offset: 54,
    },
  },
];

export function ProjectProvider({ children }: ProviderProps) {
  const [projects, setProjects] = useLocalStorage<Project[]>("green-energy-projects", defaultProjects);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("green-energy-projects");
      if (!stored) {
        setProjects(defaultProjects);
      }
    }
  }, [setProjects]);

  const value = useMemo<ProjectContextType>(() => {
    const addProject: ProjectContextType["addProject"] = (project) => {
      const now = new Date().toISOString();
      const fullProject: Project = {
        ...project,
        id: uuid(),
        createdAt: now,
        updatedAt: now,
      };
      const updated = [fullProject, ...projects];
      setProjects(updated);
      return fullProject;
    };

    const updateProject: ProjectContextType["updateProject"] = (projectId, data) => {
      const next = projects.map((item) =>
        item.id === projectId
          ? {
              ...item,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : item,
      );
      setProjects(next);
    };

    const removeProject: ProjectContextType["removeProject"] = (projectId) => {
      setProjects(projects.filter((item) => item.id !== projectId));
    };

    return {
      projects,
      addProject,
      updateProject,
      removeProject,
    };
  }, [projects, setProjects]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used inside ProjectProvider");
  }
  return context;
}
