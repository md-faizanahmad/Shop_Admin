import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Stats } from "./adminStats";

interface AdminStatsResponse {
  data: Stats;
}

export function useAdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get<AdminStatsResponse>(
        "/v1/admin/dashboard/stats",
      );

      setStats(data.data ?? null);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isActive = true;

    const pollStats = async () => {
      await fetchStats();

      if (isActive) {
        timeoutId = setTimeout(pollStats, 30_000);
      }
    };

    pollStats();

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
}
