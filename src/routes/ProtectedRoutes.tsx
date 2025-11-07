import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/useAuth";

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
    return <div className="p-6 text-sm text-gray-600">Checking session…</div>;
  }

  if (!admin) return <Navigate to="/" replace />;

  return children;
}
