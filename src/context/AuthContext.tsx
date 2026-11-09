///// updated with verifyAdminAPIKEY
import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import axios from "axios";
import { toast } from "react-toastify";

type AdminType = {
  id: string;
  name: string;
  email: string;
} | null;

interface AuthContextType {
  admin: AdminType;
  checked: boolean;
  login: (admin: AdminType) => void;
  logout: () => Promise<void>;
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

  // 🔎 Auto-check logged-in admin from cookie on refresh
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/v1/admin/me");

        if (data?.admin) {
          setAdmin(data.admin);

          // ⭐ IMPORTANT — re-enable admin API key on refresh
          // enableAdminAPIKey();
        } else {
          setAdmin(null);
        }
      } catch {
        setAdmin(null);
      } finally {
        setChecked(true);
      }
    })();
  }, []);

  // 🔐 When login succeeds
  const login = (adminData: AdminType) => {
    setAdmin(adminData);
  };

  // 🔐 Logout: clear cookie + remove admin key
  const logout = async () => {
    try {
      await api.post("/v1/admin/logout");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          toast.error("Network error. Could not contact the server.");
        } else {
          toast.error("Server error during logout.");
        }
      }
    }
    // clear UI state
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, checked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
