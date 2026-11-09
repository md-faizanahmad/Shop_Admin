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
    <form onSubmit={submit2FA} aria-busy={loading} className="space-y-6 mt-4">
      <div>
        <label
          htmlFor="two-factor-code"
          className="block text-sm font-medium text-gray-700  mb-2"
        >
          Enter 6-Digit Authenticator Code
        </label>
        <input
          id="two-factor-code"
          name="code"
          autoComplete="one-time-code"
          disabled={loading}
          type="text"
          inputMode="numeric"
          maxLength={6}
          pattern="\d{6}"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 text-center text-xl tracking-widest rounded-lg border border-gray-300  bg-white  text-gray-900  focus:ring-2 focus:ring-sky-500 outline-none"
          placeholder="••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading || code.length !== 6}
        className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-medium py-3 rounded-lg transition flex items-center justify-center"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <p className="text-center text-[11px] mt-4 text-gray-500 ">
        Secured by{" "}
        <img
          src="https://res.cloudinary.com/daqb5wglu/image/upload/v1794228387/google_w6aul9.png"
          alt="Google Authenticator"
          width={50}
          className="m-auto"
          height={40}
        />{" "}
        Authenticator 2FA/MFA 🔐
      </p>
    </form>
  );
}
