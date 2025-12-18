import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";

/**
 * Blocks access until session check finishes.
 * Redirects to "/" if no admin session.
 */
export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { admin, checked } = useAuth();

  if (!checked) {
    return <LoadingScreen />;
  }

  if (!admin) return <Navigate to="/" replace />;

  return children;
}
// for bypass without adminlogin
// import { Navigate } from "react-router-dom";
// import type { JSX } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import LoadingScreen from "@/components/LoadingScreen";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: JSX.Element;
// }) {
//   const { admin, checked } = useAuth();

//   // ✅ Allow auto-admin when running locally
//   const isDev = import.meta.env.DEV || window.location.hostname === "localhost";

//   const allowAdmin = isDev ? true : admin;

//   if (!checked && !isDev) {
//     return <LoadingScreen />;
//   }

//   if (!allowAdmin) return <Navigate to="/" replace />;

//   return children;
// }
