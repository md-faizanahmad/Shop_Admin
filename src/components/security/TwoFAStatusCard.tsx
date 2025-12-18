import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TwoFAStatusCard() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const { data } = await api.get("/v1/admin/2fa/status");
      setEnabled(data.enabled);
    } catch {
      toast.error("Unable to load 2FA status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {enabled ? (
          <CheckCircle2 className="text-green-500" size={26} />
        ) : (
          <ShieldCheck className="text-blue-500" size={26} />
        )}

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading
              ? "Checking security status..."
              : enabled
              ? "2FA enabled on this account"
              : "Enable 2FA for extra login protection"}
          </p>
        </div>
      </div>

      {!loading && (
        <button
          onClick={() =>
            navigate(
              enabled ? "/dashboard/security-center" : "/dashboard/2fa-setup"
            )
          }
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition"
        >
          {enabled ? "Manage" : "Enable"}
        </button>
      )}
    </div>
  );
}
