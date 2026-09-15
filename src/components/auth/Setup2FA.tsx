// import { useEffect, useRef, useState } from "react";
// import { api } from "@/lib/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { ShieldCheck, QrCode, Loader2, CheckCircle2 } from "lucide-react";
// import Breadcrumbs from "@/ui/Breadcrumbs";

// export default function Setup2FA() {
//   const navigate = useNavigate();

//   const [qr, setQr] = useState<string>("");
//   const [code, setCode] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [verifying, setVerifying] = useState<boolean>(false);

//   const [setupKey, setSetupKey] = useState<string>("");
//   const [showKey, setShowKey] = useState<boolean>(false);

//   const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

//   // prevent double call in React StrictMode
//   const hasInitialized = useRef(false);

//   const getQR = async (opts?: { showToast?: boolean }) => {
//     const showToast = opts?.showToast ?? true;
//     setLoading(true);
//     try {
//       const { data } = await api.post("/v1/admin/2fa/setup");
//       setQr(data.qr);
//       setSetupKey(data.setupKey || "");
//       if (showToast) {
//         toast.success("QR generated. Scan it in Google Authenticator.");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Unable to generate QR. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (hasInitialized.current) return;
//     hasInitialized.current = true;

//     const init = async () => {
//       try {
//         // load 2FA status (for status card)
//         const { data } = await api.get("/v1/admin/2fa/status");
//         setIs2FAEnabled(!!data.enabled);
//       } catch (err) {
//         console.log(err);
//         // status fail isn't fatal, just skip card
//       }

//       // initial QR WITHOUT toast (no double toast mess)
//       await getQR({ showToast: false });
//     };

//     void init();
//   }, []);

//   const verifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (code.length !== 6) return toast.error("Enter 6-digit code");

//     setVerifying(true);
//     try {
//       await api.post("/v1/admin/2fa/verify", { code });
//       toast.success("2FA enabled successfully 🎉");
//       navigate("/dashboard/security-center");
//     } catch (err: any) {
//       if (err.response?.status === 400) toast.error("Invalid code");
//       else toast.error("Server error. Try regenerating QR.");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  px-4">
//       <div>
//         <Breadcrumbs
//           items={[
//             { label: "Dashboard", href: "/dashboard" },
//             { label: "Setup 2FA" },
//           ]}
//         />
//       </div>
//       <div className="w-full max-w-lg mt-4">
//         {/* Page header */}
//         <div className="mb-6">
//           <p className="text-sm text-slate-500 mb-1">Security & Privacy</p>
//           <h1 className="text-2xl font-semibold text-slate-900">
//             Set up Two-Factor Authentication
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Add an extra layer of protection using Google Authenticator.
//           </p>
//         </div>

//         {/* Main card */}
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-lg px-6 py-7 space-y-6">
//           {/* Status card – only if already enabled */}
//           {is2FAEnabled && (
//             <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
//               <CheckCircle2 className="text-emerald-500 mt-0.5" size={20} />
//               <div>
//                 <p className="text-sm font-medium text-emerald-800">
//                   2FA is already enabled
//                 </p>
//                 <p className="text-xs text-emerald-700 mt-0.5">
//                   Your account is linked with Google Authenticator. You can
//                   re-scan this QR on a new device if needed.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Header inside card */}
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//               <ShieldCheck size={22} />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Enable 2FA with Google Authenticator
//               </h2>
//               <p className="text-xs text-slate-500 mt-1">
//                 1. Scan the QR code &nbsp; 2. Enter the 6-digit code to confirm
//               </p>
//             </div>
//           </div>

//           {/* QR + actions */}
//           <div className="flex flex-col items-center gap-3">
//             <div className="flex justify-center">
//               {loading ? (
//                 <div className="w-48 h-48 rounded-xl bg-slate-100 border border-slate-200 animate-pulse" />
//               ) : qr ? (
//                 <img
//                   src={qr}
//                   alt="2FA QR Code"
//                   className="w-52 h-52 rounded-xl border border-slate-200 shadow-md"
//                 />
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => getQR({ showToast: true })}
//                   className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
//                 >
//                   <QrCode size={16} /> Generate QR
//                 </button>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => getQR({ showToast: true })}
//               className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
//             >
//               <QrCode size={14} />
//               Regenerate QR
//             </button>

//             <p className="text-[11px] text-slate-500 text-center">
//               Use Google Authenticator (or any TOTP app), choose{" "}
//               <span className="font-medium">“Scan QR code”</span>, then enter
//               the first valid 6-digit code below.
//             </p>
//           </div>

//           {/* Setup Key (manual entry) */}
//           {setupKey && (
//             <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium text-slate-800">
//                   Setup key (manual entry)
//                 </span>
//                 <button
//                   type="button"
//                   className="text-xs text-blue-600 hover:text-blue-700"
//                   onClick={() => setShowKey((prev) => !prev)}
//                 >
//                   {showKey ? "Hide" : "Show"}
//                 </button>
//               </div>

//               {showKey ? (
//                 <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
//                   <code className="text-xs text-slate-900 break-all">
//                     {setupKey}
//                   </code>
//                   <button
//                     type="button"
//                     className="ml-3 px-2 py-1 text-[11px] bg-slate-900 text-white rounded-lg hover:bg-slate-800"
//                     onClick={() => {
//                       navigator.clipboard.writeText(setupKey);
//                       toast.success("Setup key copied");
//                     }}
//                   >
//                     Copy
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-[11px] text-slate-500">
//                   Hidden for security. Use this only if you can’t scan the QR
//                   and choose “Enter a setup key” in Google Authenticator.
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Code verify form */}
//           <form onSubmit={verifyCode} className="space-y-3">
//             <label className="block text-xs font-medium text-slate-700">
//               6-digit code from Google Authenticator
//             </label>
//             <input
//               maxLength={6}
//               inputMode="numeric"
//               placeholder="●●●●●●"
//               value={code}
//               onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//               className="w-full text-center text-3xl tracking-[0.6rem] font-semibold bg-slate-50 border border-slate-300 rounded-xl py-3 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />

//             <button
//               type="submit"
//               disabled={verifying}
//               className="mt-1 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium flex items-center justify-center gap-2 transition-colors"
//             >
//               {verifying && <Loader2 className="w-5 h-5 animate-spin" />}
//               {verifying ? "Verifying..." : "Confirm & Enable 2FA"}
//             </button>
//           </form>

//           <p className="text-[11px] text-slate-500 text-center">
//             You’ll use this code on every login, unless you mark a device as
//             trusted.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//// design and responsive
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, QrCode, Loader2, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/ui/Breadcrumbs";

export default function Setup2FA() {
  const navigate = useNavigate();

  const [qr, setQr] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  const [setupKey, setSetupKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

  const hasInitialized = useRef(false);

  const getQR = async (opts?: { showToast?: boolean }) => {
    const showToast = opts?.showToast ?? true;
    setLoading(true);
    try {
      const { data } = await api.post("/v1/admin/2fa/setup");
      setQr(data.qr);
      setSetupKey(data.setupKey || "");
      if (showToast) {
        toast.success("QR generated. Scan it in Google Authenticator.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to generate QR. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const init = async () => {
      try {
        const { data } = await api.get("/v1/admin/2fa/status");
        setIs2FAEnabled(!!data.enabled);
      } catch (err) {
        console.log(err);
      }

      await getQR({ showToast: false });
    };

    void init();
  }, []);

  const verifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length !== 6) return toast.error("Enter 6-digit code");

    setVerifying(true);
    try {
      await api.post("/v1/admin/2fa/verify", { code });
      toast.success("2FA enabled successfully 🎉");
      navigate("/dashboard/security-center");
    } catch (err: any) {
      if (err.response?.status === 400) toast.error("Invalid code");
      else toast.error("Server error. Try regenerating QR.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center ">
      {/* Breadcrumbs row */}
      <div className="w-full max-w-5xl mb-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Setup 2FA" },
          ]}
        />
      </div>

      {/* Main content wrapper */}
      <div className="w-full max-w-lg">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">Security & Privacy</p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Set up Two-Factor Authentication
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add an extra layer of protection using Google Authenticator.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg px-5 py-6 space-y-6 sm:px-6 sm:py-7">
          {/* Status card – only if already enabled */}
          {is2FAEnabled && (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <CheckCircle2 className="text-emerald-500 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  2FA is already enabled
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your account is linked with Google Authenticator. You can
                  re-scan this QR on a new device if needed.
                </p>
              </div>
            </div>
          )}

          {/* Header inside card */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sky-600">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Enable 2FA with Google Authenticator
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                1. Scan the QR code &nbsp; 2. Enter the 6-digit code to confirm
              </p>
            </div>
          </div>

          {/* QR + actions */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex justify-center">
              {loading ? (
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-xl bg-slate-100 border border-slate-200 animate-pulse" />
              ) : qr ? (
                <img
                  src={qr}
                  alt="2FA QR Code"
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl border border-slate-200 shadow-md"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => getQR({ showToast: true })}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <QrCode size={16} /> Generate QR
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => getQR({ showToast: true })}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              <QrCode size={14} />
              Regenerate QR
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              Use Google Authenticator (or any TOTP app), choose{" "}
              <span className="font-medium">“Scan QR code”</span>, then enter
              the first valid 6-digit code below.
            </p>
          </div>

          {/* Setup Key (manual entry) */}
          {setupKey && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-800">
                  Setup key (manual entry)
                </span>
                <button
                  type="button"
                  className="text-xs text-sky-600 hover:text-sky-700"
                  onClick={() => setShowKey((prev) => !prev)}
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>

              {showKey ? (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                  <code className="text-xs text-slate-900 break-all">
                    {setupKey}
                  </code>
                  <button
                    type="button"
                    className="ml-3 px-2 py-1 text-[11px] bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                    onClick={() => {
                      navigator.clipboard.writeText(setupKey);
                      toast.success("Setup key copied");
                    }}
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500">
                  Hidden for security. Use this only if you can’t scan the QR
                  and choose “Enter a setup key” in Google Authenticator.
                </p>
              )}
            </div>
          )}

          {/* Code verify form */}
          <form onSubmit={verifyCode} className="space-y-3">
            <label className="block text-xs font-medium text-slate-700">
              6-digit code from Google Authenticator
            </label>
            <input
              maxLength={6}
              inputMode="numeric"
              placeholder="●●●●●●"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center text-3xl tracking-[0.5rem] sm:tracking-[0.6rem] font-semibold bg-slate-50 border border-slate-300 rounded-xl py-3 text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={verifying}
              className="mt-1 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {verifying && <Loader2 className="w-5 h-5 animate-spin" />}
              {verifying ? "Verifying..." : "Confirm & Enable 2FA"}
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center">
            You’ll use this code on every login, unless you mark a device as
            trusted.
          </p>
        </div>
      </div>
    </div>
  );
}
