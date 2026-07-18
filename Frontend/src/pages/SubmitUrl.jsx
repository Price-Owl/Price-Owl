// import React, { useState } from "react";
// import AnimatedGradientBackground from "../components/animated-gradient-bg";
// import NavBar from "../components/Navbar";
// import toast from "react-hot-toast";
// import { urlSubmit } from "../hooks/urlSubmit";
// import { useNavigate } from "react-router";

// const SubmitUrl = () => {
//   const [productUrl, setProductUrl] = useState("");

//   const { loading, handleSubmitUrl, productTitle, price } = urlSubmit();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // api calling
//     try {
//         const response = await handleSubmitUrl({productUrl});
//         console.log("Response:", response);
//         if (response?.success) {
//           toast.success("URL submitted successfully.");
//           navigate("/");
//         } else {
//           toast.error(response.message);
//         }
//     } catch (error) {
//         console.error(error);
//         toast.error("Something went wrong.");
//       }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
//       <AnimatedGradientBackground />

//       <div className="relative z-20">
//         <NavBar />
//       </div>

//       <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-24">
//         <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16">

//           {/* LEFT CONTENT */}
//           <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">

//             <div className="mx-auto lg:mx-0 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
//               🦉
//               <span className="text-sm text-blue-300">
//                 PriceOwl • Smart Price Tracking
//               </span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
//               Track Prices.
//               <br />
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
//                 Save Money.
//               </span>
//             </h1>

//             <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
//               Paste any Amazon or Flipkart product URL and let PriceOwl
//               monitor the price for you. Get notified instantly whenever
//               the price drops.
//             </p>

//             {/* INPUT CARD */}
//             <div className="mt-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(59,130,246,0.1)]">

//               <div className="flex flex-col gap-4">

//                 <input
//                   type="text"
//                   value={productUrl}
//                   onChange={(e) => setProductUrl(e.target.value)}
//                   placeholder="Paste Amazon / Flipkart Product URL"
//                   className="
//                     w-full
//                     rounded-xl
//                     border
//                     border-white/10
//                     bg-black/40
//                     px-4
//                     py-4
//                     text-white
//                     outline-none
//                     focus:border-blue-500
//                     transition-all
//                   "
//                 />

//                 <button
//                   onClick={handleSubmit}
//                   disabled={loading}
//                   className="
//                     rounded-xl
//                     py-4
//                     font-semibold
//                     bg-gradient-to-r
//                     from-blue-600
//                     via-indigo-600
//                     to-blue-500
//                     hover:scale-[1.02]
//                     transition-all
//                     duration-300
//                     disabled:opacity-50
//                   "
//                 >
//                   {loading ? "Tracking..." : "Start Tracking →"}
//                 </button>
//               </div>

//               <div className="mt-5 flex justify-center lg:justify-start gap-3 flex-wrap">

//                 <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
//                   Amazon
//                 </span>

//                 <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
//                   Flipkart
//                 </span>

//                 <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
//                   Email Alerts
//                 </span>

//               </div>
//             </div>
//           </div>

//           {/* RIGHT ANIMATION */}
//           <div className="w-full lg:w-1/2 flex justify-center">

//             <iframe
//               src="https://lottie.host/embed/555f627d-55e4-4086-9768-ba3e8647e511/9H0QXELsKV.json"
//               className="
//                 w-[280px]
//                 h-[280px]
//                 sm:w-[350px]
//                 sm:h-[350px]
//                 md:w-[450px]
//                 md:h-[450px]
//                 lg:w-[500px]
//                 lg:h-[500px]
//                 rounded-3xl
//               "
//               title="Price Tracking Animation"
//             />

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubmitUrl;

import React, { useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import NavBar from "../components/Navbar";
import toast from "react-hot-toast";
import { urlSubmit } from "../hooks/urlSubmit";
import { useNavigate } from "react-router";
import PriceTrackerGraphic from "../components/PriceTrackerGraphic";

const SubmitUrl = () => {
  const [productUrl, setProductUrl] = useState("");
  const { loading, handleSubmitUrl } = urlSubmit();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productUrl) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      const response = await handleSubmitUrl({ productUrl });
      console.log("Response:", response);
      if (response?.success) {
        toast.success("URL submitted successfully.");
        navigate("/");
      } else {
        toast.error(response.message || "Failed to submit URL.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    // Obsidian Deep Black canvas
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0C] text-[#F4F4F6] selection:bg-white/10">
      {/* Subtle ambient gradient mesh in the background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedGradientBackground />
      </div>

      <div className="relative z-20">
        <NavBar />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
            {/* Premium Pill Badge with soft pulse dot */}
            <div className="mx-auto lg:mx-0 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">
                PriceOwl • Intelligent Tracking
              </span>
            </div>

            {/* Platinum & Silver metallic typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Track Prices.
              <br />
              <span className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Save Effortlessly.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Paste any Amazon or Flipkart product URL. Our quiet automation
              tracks changes in the background and emails you the second a
              discount drops.
            </p>

            {/* INPUT CARD (Velvet Dark Glassmorphism) */}
            <div className="mt-2 rounded-3xl border border-white/[0.06] bg-[#0E0E11]/80 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex flex-col gap-4">
                {/* Velvet Input */}
                <input
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="Paste Amazon or Flipkart Link..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-[#08080A]
                    px-5
                    py-4.5
                    text-white
                    placeholder-gray-600
                    outline-none
                    focus:border-blue-500/50
                    focus:ring-1
                    focus:ring-blue-500/20
                    transition-all
                    duration-300
                  "
                />

                {/* Tactile Solid Off-White Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="
                    w-full
                    rounded-2xl
                    py-4.5
                    font-semibold
                    text-xs
                    uppercase
                    tracking-widest
                    bg-[#F4F4F6]
                    text-[#09090B]
                    hover:bg-white
                    hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
                    transition-all
                    duration-300
                    disabled:opacity-50
                    disabled:bg-white/20
                    disabled:text-white/40
                    active:scale-[0.98]
                  "
                >
                  {loading ? "Initializing Tracker..." : "Start Tracking →"}
                </button>
              </div>

              {/* Supported Platforms with Minimalist borders */}
              <div className="mt-6 flex justify-center lg:justify-start gap-2.5 flex-wrap">
                <span className="rounded-full bg-white/[0.02] border border-white/[0.05] px-3.5 py-1.5 text-xs text-gray-400 backdrop-blur-md hover:border-white/20 transition-all duration-300 cursor-default">
                  Amazon.in
                </span>
                <span className="rounded-full bg-white/[0.02] border border-white/[0.05] px-3.5 py-1.5 text-xs text-gray-400 backdrop-blur-md hover:border-white/20 transition-all duration-300 cursor-default">
                  Flipkart.com
                </span>
                <span className="rounded-full bg-white/[0.02] border border-white/[0.05] px-3.5 py-1.5 text-xs text-gray-400 backdrop-blur-md hover:border-white/20 transition-all duration-300 cursor-default">
                  Real-time Alerts
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT ANIMATION (Framed with a subtle glow) */}
          {/* RIGHT ANIMATION */}
          <div className="w-full lg:w-1/2 flex justify-center relative group">
            {/* Light blue glow behind */}
            <div className="absolute -inset-4 rounded-3xl bg-blue-500/5 opacity-30 blur-3xl group-hover:opacity-40 transition-all duration-700"></div>

            {/* Price Tracker Graphic rendered locally */}
            <PriceTrackerGraphic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitUrl;
