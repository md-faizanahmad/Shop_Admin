import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import TwoFACode from "./2FACode";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 2FA state
  const [requires2FA, setRequires2FA] = useState<boolean>(false);
  const [tempEmail, setTempEmail] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/v1/admin/login", { email, password });

      if (data.requires2FA) {
        setRequires2FA(true);
        setTempEmail(email);
        toast.info("Enter your 6-digit Authenticator code");
        return;
      }

      login(data.admin);
      navigate("/dashboard");
      toast.success("Welcome back!");
    } catch {
      toast.error("Invalid login details");
    } finally {
      setLoading(false);
    }
  };

  // If 2FA step is active → render sleek OTP screen instead of login form
  if (requires2FA) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-100 ">
        <div className="w-full max-w-sm bg-gray-50 backdrop-blur-2xl  rounded-2xl border border-gray-200  shadow-xl p-8 space-y-6">
          <h2 className="text-center text-xl font-semibold text-gray-900  tracking-tight">
            Two-Factor Authentication
          </h2>
          <p className="text-center text-sm text-gray-700 ">
            Secure login verification required
          </p>

          <TwoFACode email={tempEmail} />

          <p className="text-center text-[11px] text-gray-500 ">
            Protected by Google Authenticator 2FA 🔐
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-100 ">
      <div className="w-full max-w-sm rounded-2xl bg-gray-50 backdrop-blur-2xl  border border-gray-200  shadow-xl p-8 space-y-8">
        {/* Branding / Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-14 w-14  flex items-center justify-center ">
            <img
              src="/brand.png"
              alt="Brand"
              className="h-10 w-10 object-contain"
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Admin Access</h1>

          <p className="text-sm text-gray-500">
            Sign in to continue to dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              required
              autoFocus
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300  bg-gray-50  px-4 py-3 text-gray-900  focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300  bg-gray-50  px-4 py-3 text-gray-900  focus:ring-2 focus:ring-blue-600 transition pr-11"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500  hover:text-gray-700 "
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 transition-all shadow-sm hover:shadow-lg active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[12px] text-gray-500">
          Protected by
          <span className="flex items-center justify-center gap-1 mt-2">
            <img
              src="/google.png"
              width={20}
              height={20}
              alt="Google Authenticator"
              className="object-contain"
            />
            Authenticator 2FA/MFA 🔐
          </span>
        </p>
      </div>
    </div>
  );
}
