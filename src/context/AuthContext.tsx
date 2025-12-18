// import { createContext, useEffect, useState } from "react";
// import { api, disableAdminAPIKey } from "@/lib/api";
// import axios from "axios";

// type AdminType = {
//   id: string;
//   name: string;
//   email: string;
// } | null;

// interface AuthContextType {
//   admin: AdminType;
//   checked: boolean; // ✅ true after /me completes
//   login: (admin: AdminType) => void; // server sets cookie; we store admin only
//   logout: () => Promise<void>; // clears cookie on server + local state
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext<AuthContextType>({
//   admin: null,
//   checked: false,
//   login: () => {},
//   logout: async () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [admin, setAdmin] = useState<AdminType>(null);
//   const [checked, setChecked] = useState(false);

//   // 🔎 Check logged-in admin on first load/refresh using cookie-based session
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.get("/v1/admin/me");
//         // Expect: { success: true, admin: { id, name, email } }
//         setAdmin(data?.admin ?? null);
//       } catch {
//         setAdmin(null);
//       } finally {
//         setChecked(true);
//       }
//     })();
//   }, []);

//   const login = (adminData: AdminType) => {
//     setAdmin(adminData);
//   };

//   const logout = async () => {
//     try {
//       await api.post("/v1/admin/logout");
//       disableAdminAPIKey();
//     } catch (err) {
//       // Best effort; ignore network errors
//       if (axios.isAxiosError(err)) {
//         // optionally console.warn(err.response?.data || err.message);
//       }
//     }
//     // Cookie is HttpOnly; server clears it. We just clear UI state.
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ admin, checked, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

///// updated with verifyAdminAPIKEY
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

    // ⭐ enable admin key after login
    // enableAdminAPIKey();
  };

  // 🔐 Logout: clear cookie + remove admin key
  const logout = async () => {
    try {
      await api.post("/v1/admin/logout");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        /* ignore network errors */
      }
    }

    // ⭐ remove admin key
    // disableAdminAPIKey();

    // clear UI state
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, checked, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
