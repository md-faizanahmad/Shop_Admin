import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/" replace />;
  return children;
}
