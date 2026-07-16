import React, { useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import NavBar from "../components/Navbar";
import toast from "react-hot-toast";
import { urlSubmit } from "../hooks/urlSubmit";
import { useNavigate } from "react-router";

const SubmitUrl = () => {
  const [productUrl, setProductUrl] = useState("");

  const { loading, handleSubmitUrl, productTitle, price } = urlSubmit();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // api calling 
    try {
        const response = await handleSubmitUrl({productUrl});

        if (response?.success) {
          toast.success("URL submitted successfully.");
          navigate("/");
        } else {
          toast.error(response.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <AnimatedGradientBackground />

      <div className="relative z-20">
        <NavBar />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-24">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">

            <div className="mx-auto lg:mx-0 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              🦉
              <span className="text-sm text-blue-300">
                PriceOwl • Smart Price Tracking
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Track Prices.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Save Money.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              Paste any Amazon or Flipkart product URL and let PriceOwl
              monitor the price for you. Get notified instantly whenever
              the price drops.
            </p>

            {/* INPUT CARD */}
            <div className="mt-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(59,130,246,0.1)]">

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
                    transition-all
                  "
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
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
                    disabled:opacity-50
                  "
                >
                  {loading ? "Tracking..." : "Start Tracking →"}
                </button>
              </div>

              <div className="mt-5 flex justify-center lg:justify-start gap-3 flex-wrap">

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

          {/* RIGHT ANIMATION */}
          <div className="w-full lg:w-1/2 flex justify-center">

            <iframe
              src="https://lottie.host/embed/555f627d-55e4-4086-9768-ba3e8647e511/9H0QXELsKV.json"
              className="
                w-[280px]
                h-[280px]
                sm:w-[350px]
                sm:h-[350px]
                md:w-[450px]
                md:h-[450px]
                lg:w-[500px]
                lg:h-[500px]
                rounded-3xl
              "
              title="Price Tracking Animation"
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default SubmitUrl;