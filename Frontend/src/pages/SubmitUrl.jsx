import React, { useState, useEffect } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavBar from "../components/Navbar";


const SubmitUrl = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = () => {
    console.log(productUrl);

    // API call yaha lagegi
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
      <AnimatedGradientBackground />
        <NavBar/>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              🦉
              <span className="text-sm text-blue-300">
                PriceOwl • Smart Price Tracking
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Track Prices.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Save Money.
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl">
              Paste any Amazon or Flipkart product URL and let PriceOwl
              monitor the price for you. Get notified instantly when the
              price drops.
            </p>

            {/* Input Card */}
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl">

              <div className="flex flex-col gap-4">

                <input
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="Paste Amazon / Flipkart Product URL"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-black/40
                    px-4
                    py-4
                    text-white
                    outline-none
                    focus:border-blue-500
                  "
                />

                <button
                  onClick={handleSubmit}
                  className="
                    rounded-xl
                    py-4
                    font-semibold
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-blue-500
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                  "
                >
                  Start Tracking →
                </button>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
                  Amazon
                </span>

                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
                  Flipkart
                </span>

                <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10">
                  Email Alerts
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Lottie */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <iframe
              width={isMobile ? 320 : 500}
              height={isMobile ? 320 : 500}
              src="https://lottie.host/embed/555f627d-55e4-4086-9768-ba3e8647e511/9H0QXELsKV.json"
              className="rounded-3xl"
              title="Price Tracking Animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitUrl;