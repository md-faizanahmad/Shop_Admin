// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const { admin } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL ?? "";
  const [name, setName] = useState<string>(admin?.name ?? "");
  const [email] = useState<string>(admin?.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (admin) setName(admin.name);
  }, [admin]);

  async function handleSave() {
    setSaving(true);
    try {
      const body: { name: string; password?: string } = { name };
      if (password.trim()) body.password = password.trim();

      await axios.put(`${API_URL}/mystoreapi/admin/update`, body, {
        withCredentials: true,
      });
      toast.success("Profile updated");
      setPassword("");
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data?.message ?? "Update failed");
      else toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Admin Profile
        </h2>

        <label className="block text-sm text-gray-600 dark:text-gray-300">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        />

        <label className="block text-sm text-gray-600 dark:text-gray-300 mt-4">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full mt-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
        />

        <label className="block text-sm text-gray-600 dark:text-gray-300 mt-4">
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty to keep current password"
          className="w-full mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
