// import { useState, useEffect } from "react";
// import { ShieldCheck, KeyRound, Smartphone } from "lucide-react";
// import { api } from "@/lib/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Row from "./Row";
// import Modal from "./Modal";
// import Breadcrumbs from "@/ui/Breadcrumbs";

// export default function SecurityCenter() {
//   const navigate = useNavigate();

//   const [, setLoading] = useState(false);
//   const [otpInput, setOtpInput] = useState("");
//   const [showCodes, setShowCodes] = useState(false);
//   const [showDisableModal, setShowDisableModal] = useState(false);
//   const [showClearModal, setShowClearModal] = useState(false);
//   const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

//   const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

//   // Load 2FA status
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.get("/v1/admin/2fa/status");
//         setIs2FAEnabled(!!data.enabled);
//       } catch {
//         toast.error("Failed to load 2FA status");
//       }
//     })();
//   }, []);

//   const regenerateCodes = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.post("/v1/admin/2fa/recovery-codes");
//       setRecoveryCodes(data.recoveryCodes);
//       setShowCodes(true);
//     } catch {
//       toast.error("Failed to regenerate codes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const disable2FA = async () => {
//     if (!otpInput.trim()) return toast.error("Enter OTP");
//     setLoading(true);

//     try {
//       const { data } = await api.post("/v1/admin/2fa/disable", {
//         code: otpInput.trim(),
//       });
//       if (data.success) {
//         toast.success("2FA disabled");
//         setShowDisableModal(false);
//         setOtpInput("");
//         setIs2FAEnabled(false); // 🔥 update UI status
//       } else toast.error("Invalid code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearTrustedDevices = async () => {
//     setLoading(true);
//     try {
//       await api.post("/v1/admin/2fa/clear-trusted");
//       toast.success("Trusted devices cleared");
//     } finally {
//       setShowClearModal(false);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-10 px-4">
//       <Breadcrumbs
//         items={[
//           { label: "Dashboard", href: "/dashboard" },
//           { label: "Security Center" },
//         ]}
//       />
//       <div className="max-w-3xl mt-4 mx-auto space-y-8">
//         <header>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Security Center
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Manage 2FA, recovery codes, & trusted devices
//           </p>
//         </header>

//         <section className="bg-white dark:bg-neutral-800 border border-neutral-700 rounded-2xl shadow-xl p-8 space-y-8">
//           {/* MFA */}
//           <Row
//             label="Two-Factor Authentication"
//             desc={
//               is2FAEnabled
//                 ? "2FA is enabled. Use Google Authenticator at login."
//                 : "Increase security by enabling 2FA with Google Authenticator."
//             }
//             icon={<ShieldCheck className="text-green-500" size={26} />}
//             btn={is2FAEnabled ? "Disable" : "Enable"}
//             onClick={
//               is2FAEnabled
//                 ? () => setShowDisableModal(true)
//                 : () => navigate("/dashboard/2fa-setup") // adjust route if different
//             }
//           />

//           {/* Recovery Codes */}
//           <Row
//             label="Recovery Codes"
//             desc="Use when Authenticator is unavailable"
//             icon={<KeyRound className="text-blue-500" size={26} />}
//             btn="Generate"
//             onClick={regenerateCodes}
//           />

//           {/* Trusted */}
//           <Row
//             label="Trusted Devices"
//             desc="Skip OTP for 30 days on approved devices"
//             icon={<Smartphone className="text-amber-500" size={26} />}
//             btn="Clear All"
//             onClick={() => setShowClearModal(true)}
//           />
//         </section>

//         {/* MODALS */}
//         {showCodes && (
//           <Modal title="Recovery Codes" onClose={() => setShowCodes(false)}>
//             <div className="space-y-2 max-h-48 overflow-y-auto bg-neutral-800 p-3 rounded-lg">
//               {recoveryCodes.map((c, i) => (
//                 <p key={i} className="font-mono text-white text-center">
//                   {c}
//                 </p>
//               ))}
//             </div>
//           </Modal>
//         )}

//         {showDisableModal && (
//           <Modal title="Disable 2FA" onClose={() => setShowDisableModal(false)}>
//             <input
//               className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
//               placeholder="Enter OTP or recovery code"
//               value={otpInput}
//               onChange={(e) => setOtpInput(e.target.value)}
//             />
//             <button
//               onClick={disable2FA}
//               className="w-full mt-4 py-2 bg-red-600 rounded-xl text-white"
//             >
//               Confirm Disable
//             </button>
//           </Modal>
//         )}

//         {showClearModal && (
//           <Modal
//             title="Clear Trusted Devices"
//             onClose={() => setShowClearModal(false)}
//           >
//             <button
//               onClick={clearTrustedDevices}
//               className="w-full py-2 bg-amber-600 rounded-xl text-white"
//             >
//               Clear All
//             </button>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// }

////// responsive
import { useState, useEffect } from "react";
import { ShieldCheck, KeyRound, Smartphone } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Row from "./Row";
import Modal from "./Modal";
import Breadcrumbs from "@/ui/Breadcrumbs";

export default function SecurityCenter() {
  const navigate = useNavigate();

  const [, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);

  // Load 2FA status
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/v1/admin/2fa/status");
        setIs2FAEnabled(!!data.enabled);
      } catch {
        toast.error("Failed to load 2FA status");
      }
    })();
  }, []);

  const regenerateCodes = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/v1/admin/2fa/recovery-codes");
      setRecoveryCodes(data.recoveryCodes);
      setShowCodes(true);
    } catch {
      toast.error("Failed to regenerate codes");
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    if (!otpInput.trim()) return toast.error("Enter OTP");
    setLoading(true);

    try {
      const { data } = await api.post("/v1/admin/2fa/disable", {
        code: otpInput.trim(),
      });
      if (data.success) {
        toast.success("2FA disabled");
        setShowDisableModal(false);
        setOtpInput("");
        setIs2FAEnabled(false);
      } else toast.error("Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const clearTrustedDevices = async () => {
    setLoading(true);
    try {
      await api.post("/v1/admin/2fa/clear-trusted");
      toast.success("Trusted devices cleared");
    } finally {
      setShowClearModal(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Security Center" },
          ]}
        />

        {/* Header */}
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Security Center
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage 2FA, recovery codes, & trusted devices
          </p>
        </header>

        {/* Main card */}
        <section className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl p-5 sm:p-8 space-y-6 sm:space-y-8">
          {/* MFA */}
          <Row
            label="Two-Factor Authentication"
            desc={
              is2FAEnabled
                ? "2FA is enabled. Use Google Authenticator at login."
                : "Increase security by enabling 2FA with Google Authenticator."
            }
            icon={<ShieldCheck className="text-green-500" size={26} />}
            btn={is2FAEnabled ? "Disable" : "Enable"}
            onClick={
              is2FAEnabled
                ? () => setShowDisableModal(true)
                : () => navigate("/dashboard/2fa-setup")
            }
          />

          {/* Recovery Codes */}
          <Row
            label="Recovery Codes"
            desc="Use when Authenticator is unavailable"
            icon={<KeyRound className="text-blue-500" size={26} />}
            btn="Generate"
            onClick={regenerateCodes}
          />

          {/* Trusted Devices */}
          <Row
            label="Trusted Devices"
            desc="Skip OTP for 30 days on approved devices"
            icon={<Smartphone className="text-amber-500" size={26} />}
            btn="Clear All"
            onClick={() => setShowClearModal(true)}
          />
        </section>

        {/* MODALS */}
        {showCodes && (
          <Modal title="Recovery Codes" onClose={() => setShowCodes(false)}>
            <div className="space-y-2 max-h-48 overflow-y-auto bg-neutral-800 p-3 rounded-lg">
              {recoveryCodes.map((c, i) => (
                <p key={i} className="font-mono text-white text-center">
                  {c}
                </p>
              ))}
            </div>
          </Modal>
        )}

        {showDisableModal && (
          <Modal title="Disable 2FA" onClose={() => setShowDisableModal(false)}>
            <input
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
              placeholder="Enter OTP or recovery code"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
            <button
              onClick={disable2FA}
              className="w-full mt-4 py-2 bg-red-600 rounded-xl text-white"
            >
              Confirm Disable
            </button>
          </Modal>
        )}

        {showClearModal && (
          <Modal
            title="Clear Trusted Devices"
            onClose={() => setShowClearModal(false)}
          >
            <button
              onClick={clearTrustedDevices}
              className="w-full py-2 bg-amber-600 rounded-xl text-white"
            >
              Clear All
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}
