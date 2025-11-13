import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/mystoreapi/admin/login", {
        email,
        password,
      });

      login(data.admin ?? null);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      const message =
        error.response?.data?.message ??
        "Unable to log in right now. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-60 flex justify-center"
        >
          {loading ? (
            <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
