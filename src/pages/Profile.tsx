import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { admin, token, updateAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    username: admin?.username || "",
    email: admin?.email || "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/admin/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Profile updated successfully");
      updateAdmin({
        ...admin,
        name: formData.name,
        username: formData.username,
        email: formData.email,
      });
    } catch (err) {
      if (axios.isAxiosError(err))
        setMessage(err.response?.data?.message || "Update failed");
      else setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col flex-1">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 w-full dark:bg-gray-700"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 w-full dark:bg-gray-700"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full dark:bg-gray-700"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password (optional)"
              className="border p-2 w-full dark:bg-gray-700"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update Profile
            </button>

            {message && (
              <p className="text-center text-sm mt-2 text-green-500">
                {message}
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
