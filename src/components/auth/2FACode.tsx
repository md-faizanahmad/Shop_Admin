import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface TwoFACodeProps {
  email: string;
}

export default function TwoFACode({ email }: TwoFACodeProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submit2FA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/v1/admin/2fa/login", {
        email,
        code,
      });

      login(data.admin);
      toast.success("2FA Verified, Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid or expired code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit2FA} className="space-y-6 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter 6-Digit Authenticator Code
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          pattern="\d{6}"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 text-center text-xl tracking-widest rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition flex items-center justify-center"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <p className="text-center text-[11px] mt-4 text-gray-500 dark:text-gray-400">
        Secured by{" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
          alt="Google"
          width={50}
          height={40}
        />{" "}
        Authenticator 2FA/MFA 🔐
      </p>
    </form>
  );
}
