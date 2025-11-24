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
