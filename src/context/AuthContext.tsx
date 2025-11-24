import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import axios from "axios";

type AdminType = {
  id: string;
  name: string;
  email: string;
} | null;

interface AuthContextType {
  admin: AdminType;
  checked: boolean; // ✅ true after /me completes
  login: (admin: AdminType) => void; // server sets cookie; we store admin only
  logout: () => Promise<void>; // clears cookie on server + local state
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  admin: null,
  checked: false,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminType>(null);
  const [checked, setChecked] = useState(false);

  // 🔎 Check logged-in admin on first load/refresh using cookie-based session
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/admin/me");
        // Expect: { success: true, admin: { id, name, email } }
        setAdmin(data?.admin ?? null);
      } catch {
        setAdmin(null);
      } finally {
        setChecked(true);
      }
    })();
  }, []);

  const login = (adminData: AdminType) => {
    setAdmin(adminData);
  };

  const logout = async () => {
    try {
      await api.post("/api/admin/logout");
    } catch (err) {
      // Best effort; ignore network errors
      if (axios.isAxiosError(err)) {
        // optionally console.warn(err.response?.data || err.message);
      }
    }
    // Cookie is HttpOnly; server clears it. We just clear UI state.
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, checked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
