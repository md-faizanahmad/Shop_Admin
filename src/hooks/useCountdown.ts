// src/hooks/useCountdown.ts
import { useState, useEffect } from "react";

export function useCountdown(seconds?: number) {
  const [time, setTime] = useState(seconds ?? 0);

  useEffect(() => {
    if (!seconds || seconds <= 0) return setTime(0);
    setTime(seconds);
    const id = setInterval(() => setTime((t) => (t > 1 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return time;
}
