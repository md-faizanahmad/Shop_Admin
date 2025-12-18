// import { useEffect, useState } from "react";
// import img from "/public/branding/launch.gif.gif";

// export default function LaunchSplash() {
//   const [done, setDone] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setDone(true), 1800); // 1.8s gif display
//     return () => clearTimeout(t);
//   }, []);

//   if (done) return null;

//   return (
//     <div className="fixed inset-0 bg-black/100 flex items-center justify-center z-50">
//       <img src={img} className="w-60 h-60 object-contain" alt="Launching..." />
//     </div>
//   );
// }
