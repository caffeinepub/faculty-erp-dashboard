import { useQuery } from "@tanstack/react-query";
import type { ActivityLog, Announcement, DashboardStats } from "../backend.d";
import { useActor } from "./useActor";

export function useDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useActivityLog() {
  const { actor, isFetching } = useActor();
  return useQuery<ActivityLog[]>({
    queryKey: ["activityLog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActivityLog();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}
