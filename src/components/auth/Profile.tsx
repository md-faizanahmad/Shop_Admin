import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, User, LogOut, Smartphone } from "lucide-react";
import TwoFAStatusCard from "@/components/security/TwoFAStatusCard";

export default function Profile() {
  const { admin, logout } = useAuth();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (admin) setName(admin.name || "");
  }, [admin]);

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Name is required");

    try {
      setSaving(true);
      await api.put("/v1/admin/update", {
        name: name.trim(),
        password: password.trim() || undefined,
      });
      toast.success("Profile updated");
      setPassword("");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">
            Account & Security
          </h1>
          <p className="text-gray-500  mt-1">
            Manage profile, authentication & device settings
          </p>
        </div>

        {/* Profile Card */}
        <section className="bg-white  rounded-2xl border border-gray-200  shadow-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 ">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700  mb-2">
                <User size={14} /> Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300  bg-gray-50  text-gray-900 "
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700  mb-2">
                <Mail size={14} /> Email
              </label>
              <div className="w-full px-4 py-3 rounded-lg border bg-gray-100  text-gray-500  cursor-not-allowed">
                {admin?.email}
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700  mb-2">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300  bg-gray-50  text-gray-900 "
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </section>

        {/* 2FA Status Card */}
        <TwoFAStatusCard />

        {/* Placeholder for device management */}
        <section className="bg-white  rounded-2xl border border-gray-200  shadow-lg p-8">
          <div className="flex items-center justify-between">
            <span className="text-gray-800  font-medium">Active Sessions</span>
            <Smartphone className="text-sky-500" size={22} />
          </div>
          <p className="text-sm text-gray-500  mt-2">
            Coming soon — device login controls.
          </p>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50  border border-red-300  rounded-2xl shadow p-6">
          <button
            onClick={logout}
            className="flex items-center justify-between w-full px-4 py-3 text-red-600 "
          >
            <span>Logout</span>
            <LogOut size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}
