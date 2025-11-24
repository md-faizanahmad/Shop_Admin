// // src/pages/Profile.tsx
// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Profile() {
//   const { admin } = useAuth();
//   const API_URL = import.meta.env.VITE_API_URL ?? "";
//   const [name, setName] = useState<string>(admin?.name ?? "");
//   const [email] = useState<string>(admin?.email ?? "");
//   const [password, setPassword] = useState<string>("");
//   const [saving, setSaving] = useState<boolean>(false);

//   useEffect(() => {
//     if (admin) setName(admin.name);
//   }, [admin]);

//   async function handleSave() {
//     setSaving(true);
//     try {
//       const body: { name: string; password?: string } = { name };
//       if (password.trim()) body.password = password.trim();

//       await axios.put(`${API_URL}/api/admin/update`, body, {
//         withCredentials: true,
//       });
//       toast.success("Profile updated");
//       setPassword("");
//     } catch (err) {
//       if (axios.isAxiosError(err))
//         toast.error(err.response?.data?.message ?? "Update failed");
//       else toast.error("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//           Admin Profile
//         </h2>

//         <label className="block text-sm text-gray-600 dark:text-gray-300">
//           Name
//         </label>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
//         />

//         <label className="block text-sm text-gray-600 dark:text-gray-300 mt-4">
//           Email
//         </label>
//         <input
//           value={email}
//           disabled
//           className="w-full mt-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
//         />

//         <label className="block text-sm text-gray-600 dark:text-gray-300 mt-4">
//           New Password
//         </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Leave empty to keep current password"
//           className="w-full mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
//         />

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Lock, Save } from "lucide-react";

export default function Profile() {
  const { admin } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL ?? "";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (admin) setName(admin.name || "");
  }, [admin]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const body: { name: string; password?: string } = { name: name.trim() };
      if (password.trim()) body.password = password.trim();

      await axios.put(`${API_URL}/api/admin/update`, body, {
        withCredentials: true,
      });

      toast.success("Profile updated successfully!");
      setPassword("");
      // refreshAuth?.(); // refresh admin data in context
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account details and security
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            {/* Avatar + Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {/* {name.charAt(0).toUpperCase() || "A"} */}
                  {(name || "A").charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-xl" />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {name || "Admin User"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {admin.email}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed">
                  {admin.email}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Email cannot be changed
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Lock className="w-4 h-4" />
                  New Password (optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Must be at least 6 characters if changed
                </p>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSave}
                  disabled={saving || !name.trim()}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          You are logged in as{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {admin.email}
          </span>
        </div>
      </div>
    </div>
  );
}
