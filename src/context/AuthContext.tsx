import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AdminType {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  admin: AdminType | null;
  login: (token: string | null, admin: AdminType | null) => void;
  logout: () => void;
  token: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  admin: null,
  login: () => {},
  logout: () => {},
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminType | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const login = (_token: string | null, adminData: AdminType | null) => {
    setAdmin(adminData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/mystoreapi/admin/logout`,
        {},
        { withCredentials: true }
      );
    } catch {
      /* ignore */
    }
    document.cookie = "token=; Max-Age=0; path=/;";
    setAdmin(null);
  };

  // 👇 Check logged-in admin on refresh
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${API_URL}/mystoreapi/admin/me`, {
          withCredentials: true,
        });
        setAdmin(res.data.admin);
      } catch {
        setAdmin(null);
      }
    };
    checkAdmin();
  }, [API_URL]);

  return (
    <AuthContext.Provider value={{ admin, login, logout, token: null }}>
      {children}
    </AuthContext.Provider>
  );
};
